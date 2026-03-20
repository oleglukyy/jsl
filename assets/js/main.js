/* ============================================
   AquaGuard Socorrismo — main.js
   ============================================ */

// ---- NAVBAR SCROLL ----
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// ---- HAMBURGER MENU ----
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- ACTIVE NAV LINK ----
(function markActive() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position within parent
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.1}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

// ---- COUNTER ANIMATION (hero stats) ----
const counters = document.querySelectorAll('.hero-stat-num[data-target]');

if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

// ---- FORM VALIDATION (contacto) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    const fields = contactForm.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#e74c3c';
        valid = false;
      }
    });

    const emailField = contactForm.querySelector('[type="email"]');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (feedback) {
      feedback.style.display = 'block';
      if (valid) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.';
        contactForm.reset();
      } else {
        feedback.className = 'form-feedback error';
        feedback.textContent = '✗ Por favor, rellena todos los campos obligatorios correctamente.';
      }
      setTimeout(() => { feedback.style.display = 'none'; }, 5000);
    }
  });
}
