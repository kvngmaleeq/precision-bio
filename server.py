from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import base64
import json
import os
import smtplib
from email.message import EmailMessage
from urllib.parse import urlparse
import urllib.request
import urllib.parse

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)
REGISTRATIONS_FILE = DATA_DIR / "registrations.json"
ENV_FILES = [ROOT / ".env", ROOT / "precisionbios.env"]


def load_env_file():
    for env_path in ENV_FILES:
        if not env_path.exists():
            continue
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("\"'")
            if key == "GMAIL_PASSWORD":
                value = "".join(value.split())
            os.environ[key] = value


load_env_file()

COMPOUNDS = [
    {"name": "Retatrutide", "cat": "Metabolic Research", "price": "$180"},
    {"name": "Cagrilintide", "cat": "Metabolic Research", "price": "$160"},
    {"name": "MOTS-c", "cat": "Mitochondrial Research", "price": "$95"},
    {"name": "BPC-157", "cat": "Tissue Repair Research", "price": "$70"},
    {"name": "TB-500", "cat": "Tissue Repair Research", "price": "$75"},
    {"name": "GHK-Cu", "cat": "Dermal / Cellular Research", "price": "$85"},
    {"name": "PT-141", "cat": "Receptor Pharmacology", "price": "$110"},
    {"name": "Semax", "cat": "Neuropeptide Research", "price": "$60"},
    {"name": "Selank", "cat": "Neuropeptide Research", "price": "$65"},
    {"name": "DSIP", "cat": "Sleep / Neuropeptide Research", "price": "$55"},
]


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/compounds":
            self.send_json(COMPOUNDS)
            return
        if parsed.path == "/api/registrations":
            self.send_json(self._read_registrations())
            return
        if parsed.path in {"/", "/index.html"}:
            self._serve_file("index.html")
            return
        self._serve_file(parsed.path.lstrip("/"))

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/register":
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length).decode("utf-8")
            payload = json.loads(body or "{}")
            records = self._read_registrations()
            records.append(payload)
            REGISTRATIONS_FILE.write_text(json.dumps(records, indent=2), encoding="utf-8")
            email_sent = self._send_order_email(payload)
            self.send_json({"ok": True, "message": "Registration received", "emailSent": email_sent})
            return
        self.send_error(404)

    def _serve_file(self, relative_path):
        file_path = (ROOT / relative_path).resolve()
        if not str(file_path).startswith(str(ROOT)):
            self.send_error(403)
            return
        if file_path.is_dir():
            file_path = file_path / "index.html"
        if not file_path.exists():
            self.send_error(404)
            return
        content_type = self._content_type(file_path)
        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _content_type(self, path):
        if path.suffix == ".html":
            return "text/html; charset=utf-8"
        if path.suffix == ".css":
            return "text/css; charset=utf-8"
        if path.suffix == ".js":
            return "application/javascript; charset=utf-8"
        if path.suffix == ".json":
            return "application/json; charset=utf-8"
        if path.suffix == ".pdf":
            return "application/pdf"
        return "application/octet-stream"

    def _read_registrations(self):
        if not REGISTRATIONS_FILE.exists():
            return []
        try:
            return json.loads(REGISTRATIONS_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return []

    def _send_order_email(self, payload):
        sender = os.environ.get("GMAIL_USER")
        password = os.environ.get("GMAIL_PASSWORD")
        recipient = os.environ.get("ORDER_EMAIL", sender)
        if not sender or not password or not recipient:
            print("Email delivery skipped: set GMAIL_USER and GMAIL_PASSWORD in .env")
            return False

        body = [
            f"Name: {payload.get('name', '')}",
            f"Phone: {payload.get('phone', '')}",
            f"Email: {payload.get('email', '')}",
            f"Address: {payload.get('address', '')}",
            f"Total: {payload.get('totalAmount', '')}",
            "",
            "Selected compounds:",
            payload.get("selectedCompounds", "")
        ]
        subject = f"New order from {payload.get('name', 'Unknown')}"

        try:
            self._send_via_mailgun(subject, recipient, "\n".join(body), sender)
            return True
        except Exception as exc:
            print(f"Mail provider send failed: {exc}")
            try:
                msg = EmailMessage()
                msg["Subject"] = subject
                msg["From"] = sender
                msg["To"] = recipient
                msg.set_content("\n".join(body))
                with smtplib.SMTP("smtp.gmail.com", 587) as server:
                    server.starttls()
                    server.login(sender, password)
                    server.send_message(msg)
                return True
            except Exception as smtp_exc:
                print(f"Email sending failed: {smtp_exc}")
                return False

    def _send_via_mailgun(self, subject, recipient, body, sender):
        api_key = os.environ.get("MAILGUN_API_KEY")
        domain = os.environ.get("MAILGUN_DOMAIN")
        if not api_key or not domain:
            raise RuntimeError("MAILGUN_API_KEY and MAILGUN_DOMAIN not configured")

        data = urllib.parse.urlencode({
            "from": f"Precisionbios <{sender}>",
            "to": recipient,
            "subject": subject,
            "text": body
        }).encode("utf-8")

        auth_token = base64.b64encode(f"api:{api_key}".encode("utf-8")).decode("ascii")
        req = urllib.request.Request(
            f"https://api.mailgun.net/v3/{domain}/messages",
            data=data,
            headers={"Authorization": f"Basic {auth_token}"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=20) as response:
            if response.status >= 400:
                raise RuntimeError(f"Mailgun returned {response.status}")

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Serving precisionbios at http://127.0.0.1:{port}")
    server.serve_forever()
