const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Small rotating role label in the hero.
const roleElement = document.getElementById('typed-role');
const roles = ['Python Developer', 'Web Developer', 'Software Developer'];
let roleIndex = 0;
if (roleElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    roleElement.style.opacity = '0';
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.textContent = roles[roleIndex];
      roleElement.style.opacity = '1';
    }, 220);
  }, 2600);
}
document.getElementById('year').textContent = new Date().getFullYear();
