# precisionbios — Research Peptide & Reagent Supply

**Quality. Purity. Trust.**

A modern, glossy Apple-inspired web platform for institutional ordering of research peptides and reference compounds. Built with vanilla JavaScript, CSS3 glass morphism, and a Python backend.

## Features

✅ **Product Showcase**
- 12 research compounds with detailed descriptions
- Responsive product cards with hover effects
- Click to view full details modal with image gallery

✅ **Smart Shopping Cart**
- Quantity selector (1–10 units or bulk packs)
- Real-time price calculation
- Add/remove items with live updates
- Cart persists across sections

✅ **Product Detail Modal**
- Dual image gallery with navigation arrows and thumbnails
- Full product descriptions and research context
- Dynamic pricing based on selected quantity
- Smooth animations and glass-effect UI

✅ **Order Management**
- Institutional registration form
- Pre-filled compound list and total from cart
- Email fallback for offline order submission
- Contact information and support channels

✅ **Design System**
- Glossy Apple aesthetic with glass morphism effects
- Premium gradients and smooth transitions
- Fully responsive (mobile, tablet, desktop)
- Accessibility-first approach (semantic HTML, focus states)

## Technology Stack

- **Frontend**: HTML5, CSS3 (Glass Morphism), Vanilla JavaScript
- **Backend**: Python (Flask/HTTP server)
- **Fonts**: Inter, Manrope, Poppins, IBM Plex Mono, Space Grotesk
- **Icons**: Inline SVG

## Project Structure

```
precision-bio/
├── index.html              # Main landing page
├── css/
│   └── style.css          # Unified styling (glass UI, modals, responsive)
├── js/
│   └── main.js            # Cart logic, modal handler, form submission
├── assets/
│   ├── precision-bio-icon.png
│   ├── precision-bio-logo.png
│   ├── price-list.pdf     # Downloadable pricing
│   └── coa-result.pdf     # Certificate of Analysis template
├── images/
│   └── [product images]   # Compound photos (semax, tirzepatide, etc.)
├── policies/
│   ├── shipping.html
│   ├── privacy.html
│   ├── terms.html
│   ├── disclaimer.html
│   ├── refund.html
│   └── faq.html
├── server.py              # Local development server
├── test_email.py          # Email verification script
└── .env.example           # Environment variables template
```

## Compounds Available

1. **Semax** — Neuropeptide Research (₦168,000)
2. **AOD 9604** — Metabolic Research (₦200,000)
3. **Retatrutide** — Metabolic Research (₦300,000)
4. **KPV** — Anti-Inflammatory Research (₦200,000)
5. **Tirzepatide** — Metabolic Research (₦230,000)
6. **MOTS-c** — Mitochondrial Research (₦200,000)
7. **GHK-Cu** — Dermal / Cellular Research (₦250,000)
8. **ACD 856** — Cognitive Research (₦220,000)
9. **Glutathione** — Antioxidant Research (₦220,000)
10. **Tesamorelin** — Growth Hormone Research (₦190,000)
11. **NAD+** — Cellular Energy Research (₦180,000)
12. **Semaglutide** — Metabolic Research (₦154,000)

## Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/precision-bio-site.git
cd precision-bio-site

# Copy environment template
cp .env.example .env

# Start the local server
python server.py

# Open browser
http://localhost:8000
```

### Configuration

Update `.env` with your settings:

```env
API_ENDPOINT=http://localhost:8000/api
SUPPORT_EMAIL=support@precisionbios.com
WHATSAPP_NUMBER=+2349164842826
```

## Usage

### For Users

1. **Browse Products** — Scroll through the Shop section
2. **View Details** — Click any product card to open the modal
3. **Select Quantity** — Choose units (1–10) or a bulk pack
4. **Add to Cart** — Items appear in the Cart section with live totals
5. **Register & Order** — Scroll to the Register section and submit your order

### For Developers

#### Adding a New Compound

Edit `js/main.js`, add to the `compounds` array:

```javascript
{
  name: "Your Compound",
  cat: "Research Category",
  price: 100000,
  packPrice: 900000,
  packSize: 10,
  imgs: ["images/compound-1.jpg", "images/compound-2.jpg"],
  desc: "Full research description here..."
}
```

#### Customizing Styling

All CSS is in `css/style.css`. Key variables:

```css
:root {
  --navy: #0F172A;           /* Primary dark */
  --royal: #3B82F6;          /* Accent blue */
  --glass-bg: rgba(255,255,255,0.7);
  --glass-border: rgba(255,255,255,0.3);
}
```

## API Endpoints

### POST `/api/register`

Submits a new order:

```json
{
  "name": "String",
  "email": "String",
  "phone": "String",
  "address": "String",
  "selectedCompounds": "String (formatted list)",
  "totalAmount": "String (naira formatted)",
  "submittedAt": "ISO 8601 timestamp"
}
```

**Response:**
- `200 OK`: Order received, email sent
- `500 Error`: Falls back to mailto: client-side

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external dependencies** — vanilla JS, local fonts
- **Small bundle** — ~50KB total (HTML + CSS + JS)
- **Image optimization** — Use WebP where possible, lazy-load if needed
- **Core Web Vitals** — Optimized for LCP, FID, CLS

## Security

- **Content Security Policy** — All inline SVG and styles
- **No cookies/tracking** — Privacy-first design
- **Form validation** — Client-side + server-side
- **Environment variables** — Sensitive data in `.env` (not committed)

## License

MIT License — See LICENSE file for details.

## Support

- **Email**: support@precisionbios.com
- **WhatsApp**: +234 916 484 2826
- **Response time**: 1–2 business days

---

**Built with precision for research organizations. Quality. Purity. Trust.**
