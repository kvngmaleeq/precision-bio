// ============================================================
// PRODUCT PORTFOLIO
// To add a real photo: set "img" to the file path, e.g.
//   img: "images/retatrutide.jpg"
// and place that file inside the /images folder.
// Leave img: null to show the placeholder icon instead.
// ============================================================
const compounds = [
  { name: "Retatrutide", cat: "Metabolic Research", img: "images/retatrutide.jpg" },
  { name: "Cagrilintide", cat: "Metabolic Research", img: "images/cagrilintide.jpg" },
  { name: "MOTS-c", cat: "Mitochondrial Research", img: "images/mots-c.jpg" },
  { name: "BPC-157", cat: "Tissue Repair Research", img: "images/bpc-157.jpg" },
  { name: "TB-500", cat: "Tissue Repair Research", img: "images/tb-500.jpg" },
  { name: "GHK-Cu", cat: "Dermal / Cellular Research", img: "images/ghk-cu.jpg" },
  { name: "PT-141", cat: "Receptor Pharmacology", img: "images/pt-141.jpg" },
  { name: "Semax", cat: "Neuropeptide Research", img: "images/semax.jpg" },
  { name: "Selank", cat: "Neuropeptide Research", img: "images/selank.jpg" },
  { name: "DSIP", cat: "Sleep / Neuropeptide Research", img: "images/dsip.jpg" },
];

function renderPortfolio(){
  const grid = document.getElementById('portGrid');
  if (!grid) return;
  compounds.forEach(c => {
    const el = document.createElement('div');
    el.className = 'port-card';
    const imgHTML = c.img
      ? `<img src="${c.img}" alt="${c.name}">`
      : `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>`;
    el.innerHTML = `
      <div class="img-slot">${imgHTML}</div>
      <div class="body">
        <div class="cat">${c.cat}</div>
        <div class="name">${c.name}</div>
        <div class="gate">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          Research access required
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

// ============================================================
// FORMSPREE — Research Access form
// ============================================================
function initAccessForm(){
  if (!document.getElementById('accessForm')) return;
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#accessForm', formId: 'mvzejkvr' });
}

document.addEventListener('DOMContentLoaded', function(){
  renderPortfolio();
  initAccessForm();
});
