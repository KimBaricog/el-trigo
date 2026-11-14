// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav styling
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Gallery lightbox
const box = document.createElement('div');
box.className = 'lightbox';
box.innerHTML = '<img alt="">';
document.body.appendChild(box);
const boxImg = box.querySelector('img');
document.querySelectorAll('.g-item img').forEach(img => {
  img.addEventListener('click', () => {
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    box.classList.add('show');
  });
});
box.addEventListener('click', () => box.classList.remove('show'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('show'); });

// Booking form (static demo: shows a confirmation message only)
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = new FormData(e.target).get('name');
  document.getElementById('formMsg').textContent =
    `Thanks, ${name}! We'll confirm your booking shortly.`;
  e.target.reset();
});
