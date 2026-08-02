import os
import shutil

source = r'c:\Users\OMEN\Downloads\precision-bio-site_1\precision-bio\assets\pricelist2026.pdf'
dest = r'c:\Users\OMEN\Downloads\precision-bio-site_1\precision-bio\assets\price-list.pdf'

if os.path.exists(source):
    shutil.move(source, dest)
    print(f"✓ Renamed pricelist2026.pdf → price-list.pdf")
else:
    print("File not found")
