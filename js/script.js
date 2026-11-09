// Menú móvil: se cierra al elegir una página, con Escape, al tocar fuera o al pasar a pantalla grande
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const closeMenu = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.side')) closeMenu(); });
matchMedia('(min-width:1151px)').addEventListener('change', closeMenu);

// Pestañas de la página: resalta la que se está viendo
const tabs = [...document.querySelectorAll('.tabs a')];
if (tabs.length) {
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    tabs.forEach(t => {
      const on = t.hash === '#' + e.target.id;
      t.classList.toggle('on', on);
      if (on) t.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
  }), { rootMargin: '-35% 0px -60% 0px' });
  tabs.forEach(t => { const el = document.getElementById(t.hash.slice(1)); if (el) spy.observe(el); });
}

// Tarjetas de misión y visión: voltean al tocarlas
document.querySelectorAll('.flip').forEach(c =>
  c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));

// Aparición suave de bloques marcados
const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
