import os
import importlib.util

os.environ['GMAIL_USER'] = 'olowoakemaleek510@gmail.com'
os.environ['GMAIL_PASSWORD'] = 'Iwaoisvjjbazgmnl'
os.environ['ORDER_EMAIL'] = 'support@precisionbios.com'

spec = importlib.util.spec_from_file_location('server_mod', 'server.py')
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
mod.Handler._send_order_email(None, {
    'name': 'Test User',
    'phone': '123456',
    'email': 'x@y.com',
    'address': 'Test Address',
    'totalAmount': '₦1',
    'selectedCompounds': 'Test Compound'
})
print('smtp-test-complete')
