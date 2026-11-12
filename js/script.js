// Menú móvil: se cierra al elegir una página, con Escape, al tocar fuera o al pasar a pantalla grande
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const closeMenu = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.side')) closeMenu(); });
matchMedia('(min-width:1151px)').addEventListener('change', closeMenu);

// Pestañas de la página: resalta la que se está viendo (sin scrollIntoView: evita tirones al hacer scroll)
const tabs = [...document.querySelectorAll('.tabs a')];
const tabBar = document.querySelector('.tabs');
let current = null;
function showTab(t) {
  const l = t.offsetLeft, r = l + t.offsetWidth;
  if (l < tabBar.scrollLeft + 8 || r > tabBar.scrollLeft + tabBar.clientWidth - 8)
    tabBar.scrollLeft = l - (tabBar.clientWidth - t.offsetWidth) / 2;
}
if (tabs.length) {
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = tabs.find(x => x.hash === '#' + e.target.id);
    if (!t || t === current) return;
    current = t;
    tabs.forEach(x => x.classList.toggle('on', x === t));
    requestAnimationFrame(() => showTab(t));
  }), { rootMargin: '-35% 0px -60% 0px' });
  tabs.forEach(t => { const el = document.getElementById(t.hash.slice(1)); if (el) spy.observe(el); });
}

// Pausa las animaciones decorativas del inicio cuando no se ven
const hero = document.querySelector('.hero');
if (hero) new IntersectionObserver(([e]) => hero.classList.toggle('paused', !e.isIntersecting)).observe(hero);

// Tarjetas de misión y visión: voltean al tocarlas
document.querySelectorAll('.flip').forEach(c =>
  c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));

// Aparición suave de bloques marcados
const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
