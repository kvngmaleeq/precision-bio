// ============================================================
// PRODUCT PORTFOLIO
// ============================================================
const compounds = [
  {
    name: "Semax",
    cat: "Neuropeptide Research",
    price: 60000,
    packSize: 5,
    imgs: ["images/semax-1.jpg", "images/semax-2.jpg"],
    desc: "Semax is a heptapeptide analogue of ACTH(4–7). Research indicates neuroprotective properties and a role in cognitive enhancement, memory consolidation, and neurogenesis support. Widely studied for its influence on BDNF levels and the serotonin/dopamine system."
  },
  {
    name: "AOD 9604",
    cat: "Metabolic Research",
    price: 75000,
    packSize: 5,
    imgs: ["images/aod9604-1.jpg", "images/aod9604-2.jpg"],
    desc: "AOD 9604 is a modified C-terminal fragment of human growth hormone. Research focuses on lipid metabolism, fat oxidation, and applications in obesity-related metabolic studies without affecting blood sugar or cell proliferation."
  },
  {
    name: "Retatrutide",
    cat: "Metabolic Research",
    price: 180000,
    packSize: 5,
    imgs: ["images/retatrutide-1.jpg", "images/retatrutide-2.jpg"],
    desc: "Retatrutide is a triple GIP/GLP-1/glucagon receptor agonist. Clinical research has demonstrated significant effects on body weight reduction and comprehensive metabolic regulation, showing superior outcomes to dual-agonist compounds."
  },
  {
    name: "KPV",
    cat: "Anti-Inflammatory Research",
    price: 55000,
    packSize: 5,
    imgs: ["images/kpv-1.jpg", "images/kpv-2.jpg"],
    desc: "KPV is the C-terminal tripeptide of α-MSH (Lys-Pro-Val). Research highlights potent anti-inflammatory properties, gut mucosal health applications, wound healing acceleration, and downregulation of NF-κB signalling pathways."
  },
  {
    name: "Tirzepatide",
    cat: "Metabolic Research",
    price: 195000,
    packSize: 5,
    imgs: ["images/tirzepatide-1.jpg", "images/tirzepatide-2.jpg"],
    desc: "Tirzepatide is a dual GIP and GLP-1 receptor agonist. Research has demonstrated significant efficacy in glycemic control, insulin secretion, body weight management, and cardiovascular risk factor reduction."
  },
  {
    name: "MOTS-c",
    cat: "Mitochondrial Research",
    price: 95000,
    packSize: 5,
    imgs: ["images/mots-c-1.jpg", "images/mots-c-2.jpg"],
    desc: "MOTS-c is a mitochondria-derived peptide (MDP) encoded in the 12S rRNA region. Research highlights roles in metabolic regulation, insulin sensitivity, AMPK activation, and cellular stress response adaptation."
  },
  {
    name: "GHK-Cu",
    cat: "Dermal / Cellular Research",
    price: 85000,
    packSize: 5,
    imgs: ["images/ghk-cu-1.jpg", "images/ghk-cu-2.jpg"],
    desc: "GHK-Cu is a naturally occurring copper-binding tripeptide. Research shows significant activity in wound healing, collagen and elastin synthesis, skin barrier regeneration, and modulation of over 4,000 human genes."
  },
  {
    name: "ACD 856",
    cat: "Cognitive Research",
    price: 120000,
    packSize: 5,
    imgs: ["images/acd856-1.jpg", "images/acd856-2.jpg"],
    desc: "ACD 856 is a positive allosteric modulator of the TrkA neurotrophin receptor. Research suggests applications in cholinergic signalling enhancement, memory-related neurological studies, and potential neurodegenerative disease models."
  },
  {
    name: "Glutathione",
    cat: "Antioxidant Research",
    price: 50000,
    packSize: 5,
    imgs: ["images/glutathione-1.jpg", "images/glutathione-2.jpg"],
    desc: "Glutathione (γ-Glu-Cys-Gly) is the body's master antioxidant tripeptide. Research focuses on oxidative stress reduction, immune modulation, hepatic detoxification pathways, and mitochondrial function preservation."
  },
  {
    name: "Tesamorelin",
    cat: "Growth Hormone Research",
    price: 140000,
    packSize: 5,
    imgs: ["images/tesamorelin-1.jpg", "images/tesamorelin-2.jpg"],
    desc: "Tesamorelin is a synthetic GHRH analogue (trans-3-hexenoic acid–GHRH). Research demonstrates pulsatile growth hormone stimulation, IGF-1 upregulation, visceral adipose tissue reduction, and lipodystrophy management."
  }
];

function naira(v){ return `₦${v.toLocaleString('en-NG')}`; }

let cart = [];
let modalIdx = null;
let modalQty = 1;
let galleryIdx = 0;

// ============================================================
// PORTFOLIO RENDER
// ============================================================
function renderPortfolio(){
  const grid = document.getElementById('portGrid');
  if (!grid) return;
  grid.innerHTML = '';
  compounds.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'port-card';
    el.innerHTML = `
      <div class="img-slot">
        <img src="${c.imgs[0]}" alt="${c.name}" onerror="this.style.display='none'">
        <div class="img-overlay">
          <button class="view-btn" data-idx="${i}" type="button">View Details →</button>
        </div>
      </div>
      <div class="body">
        <div class="cat">${c.cat}</div>
        <div class="name">${c.name}</div>
        <div class="desc-preview">${c.desc.slice(0, 85)}…</div>
        <div class="card-footer">
          <span class="price-tag">${naira(c.price)}<span class="per-unit"> /unit</span></span>
          <button class="add-btn" data-idx="${i}" type="button">+ Add</button>
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

// ============================================================
// MODAL
// ============================================================
function openModal(i){
  const c = compounds[i];
  if (!c) return;
  modalIdx = i;
  modalQty = 1;
  galleryIdx = 0;

  document.getElementById('modalCat').textContent = c.cat;
  document.getElementById('modalName').textContent = c.name;
  document.getElementById('modalDesc').textContent = c.desc;

  renderGallery();
  renderQtySelector();
  updateModalPrice();

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('productModal')?.classList.remove('open');
  document.body.style.overflow = '';
  modalIdx = null;
}

function renderGallery(){
  const c = compounds[modalIdx];
  if (!c) return;

  const track = document.getElementById('galleryTrack');
  if (track){
    track.innerHTML = c.imgs.map((src, i) => `
      <div class="gallery-slide${i === galleryIdx ? ' active' : ''}">
        <img src="${src}" alt="${c.name} ${i + 1}" onerror="this.style.display='none';this.parentNode.classList.add('img-placeholder')">
      </div>`).join('');
  }

  const thumbs = document.getElementById('galleryThumbs');
  if (thumbs){
    thumbs.innerHTML = c.imgs.map((src, i) => `
      <div class="thumb${i === galleryIdx ? ' active' : ''}" data-thumb="${i}">
        <img src="${src}" alt="${c.name} ${i + 1}" onerror="this.style.display='none';this.parentNode.classList.add('img-placeholder')">
      </div>`).join('');
  }
}

function goGallery(dir){
  galleryIdx = (galleryIdx + dir + compounds[modalIdx].imgs.length) % compounds[modalIdx].imgs.length;
  renderGallery();
}

// ============================================================
// QUANTITY SELECTOR
// ============================================================
function renderQtySelector(){
  const c = compounds[modalIdx];
  const wrap = document.getElementById('qtyOptions');
  if (!wrap) return;
  let html = '';
  for (let q = 1; q <= 10; q++){
    html += `<button class="qty-btn${modalQty === q ? ' active' : ''}" data-qty="${q}" type="button">${q}</button>`;
  }
  html += `<button class="qty-btn qty-pack${modalQty === 'pack' ? ' active' : ''}" data-qty="pack" type="button">Pack (${c.packSize})</button>`;
  wrap.innerHTML = html;
}

function selectQty(val){
  modalQty = val === 'pack' ? 'pack' : parseInt(val);
  renderQtySelector();
  updateModalPrice();
}

function getModalUnits(){
  return modalQty === 'pack' ? compounds[modalIdx].packSize : modalQty;
}

function updateModalPrice(){
  const c = compounds[modalIdx];
  const units = getModalUnits();
  const el = document.getElementById('modalPrice');
  if (el){
    const label = modalQty === 'pack' ? `Pack of ${c.packSize} units` : `${units} unit${units > 1 ? 's' : ''}`;
    el.innerHTML = `<span class="mp-total">${naira(c.price * units)}</span><span class="mp-label">${label}</span>`;
  }
}

// ============================================================
// CART
// ============================================================
function populateOrderForm(){
  const sel = document.getElementById('selectedCompounds');
  const totField = document.getElementById('orderTotal');
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  if (sel){
    sel.value = cart.length
      ? cart.map(x => `${x.name} × ${x.qty} — ${naira(x.price * x.qty)}`).join('\n')
      : '';
  }
  if (totField) totField.value = naira(total);
  return total;
}

function renderCart(){
  const panel = document.getElementById('cartPanel');
  if (!panel) return;
  if (!cart.length){
    panel.innerHTML = '<div class="cart-empty">No compounds selected yet.</div>';
    populateOrderForm();
    return;
  }
  const items = cart.map(x => `
    <div class="cart-item">
      <div class="meta">
        <strong>${x.name}</strong>
        <span>${x.cat}</span>
      </div>
      <div class="cart-item-actions">
        <span class="cart-qty-badge">× ${x.qty}</span>
        <div class="price">${naira(x.price * x.qty)}</div>
        <button class="cart-remove" data-name="${x.name}" type="button">Remove</button>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  panel.innerHTML = `
    ${items}
    <div class="cart-total"><span>Total</span><span>${naira(total)}</span></div>
    <div class="cart-actions">
      <button class="cart-btn primary" type="button">Use in order ↓</button>
    </div>`;
  populateOrderForm();
}

function addToCart(name, qty){
  const c = compounds.find(x => x.name === name);
  if (!c) return;
  const units = qty === 'pack' ? c.packSize : parseInt(qty);
  const existing = cart.find(x => x.name === name);
  if (existing){ existing.qty += units; }
  else { cart.push({ name: c.name, cat: c.cat, price: c.price, qty: units }); }
  renderCart();
}

function removeFromCart(name){
  cart = cart.filter(x => x.name !== name);
  renderCart();
}

// ============================================================
// EVENT DELEGATION
// ============================================================
function initCart(){
  document.addEventListener('click', function(e){
    const addBtn = e.target.closest('.add-btn');
    if (addBtn){ addToCart(compounds[parseInt(addBtn.dataset.idx)]?.name, 1); return; }

    const viewBtn = e.target.closest('.view-btn');
    if (viewBtn){ openModal(parseInt(viewBtn.dataset.idx)); return; }

    // clicking anywhere on card body (except + Add) also opens modal
    const portCard = e.target.closest('.port-card');
    if (portCard && !e.target.closest('.add-btn')){ openModal(parseInt(portCard.dataset.idx)); return; }

    const removeBtn = e.target.closest('.cart-remove');
    if (removeBtn){ removeFromCart(removeBtn.dataset.name); return; }

    const orderBtn = e.target.closest('.cart-btn.primary');
    if (orderBtn){
      populateOrderForm();
      document.getElementById('access')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn){ selectQty(qtyBtn.dataset.qty); return; }

    const thumb = e.target.closest('.thumb');
    if (thumb){ galleryIdx = parseInt(thumb.dataset.thumb); renderGallery(); return; }

    if (e.target.closest('#galleryPrev')){ goGallery(-1); return; }
    if (e.target.closest('#galleryNext')){ goGallery(1); return; }

    if (e.target.closest('#modalAddBtn') && modalIdx !== null){
      addToCart(compounds[modalIdx].name, modalQty);
      closeModal();
      document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (e.target.closest('#modalCloseBtn') || e.target.id === 'productModal'){ closeModal(); return; }
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  renderCart();
}

// ============================================================
// ORDER MAIL FALLBACK
// ============================================================
function openOrderMailClient(payload){
  const r = 'support@precisionbios.com';
  const s = encodeURIComponent(`New order from ${payload.name || 'Customer'}`);
  const b = encodeURIComponent([
    `Name: ${payload.name || ''}`,
    `Phone: ${payload.phone || ''}`,
    `Email: ${payload.email || ''}`,
    `Address: ${payload.address || ''}`,
    `Total: ${payload.totalAmount || ''}`,
    '',
    'Selected compounds:',
    payload.selectedCompounds || ''
  ].join('\n'));
  const a = document.createElement('a');
  a.href = `mailto:${r}?subject=${s}&body=${b}`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ============================================================
// FORM SUBMIT
// ============================================================
function initAccessForm(){
  const form = document.getElementById('accessForm');
  if (!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const total = populateOrderForm();
    const sel = document.getElementById('selectedCompounds');
    const payload = {
      name: form.querySelector('#name').value.trim(),
      address: form.querySelector('#address').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      email: form.querySelector('#email').value.trim(),
      selectedCompounds: sel ? sel.value : '',
      totalAmount: naira(total),
      submittedAt: new Date().toISOString()
    };
    const msg = form.querySelector('[data-fs-success]');
    const err = form.querySelector('[data-fs-error]');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error();
      if (msg){ msg.classList.add('show'); if (err) err.classList.remove('show'); }
      if (result && result.emailSent === false) openOrderMailClient(payload);
      form.reset();
      cart = [];
      renderCart();
    } catch {
      if (err){ err.classList.add('show'); if (msg) msg.classList.remove('show'); }
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  renderPortfolio();
  initCart();
  initAccessForm();
});
