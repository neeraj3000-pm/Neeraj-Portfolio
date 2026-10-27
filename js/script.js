// ============ THEME TOGGLE ============
// The saved theme is applied by an inline script in <head> to avoid a flash.
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('achievementToast');
let toastTimer;

function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    if (next === 'dark') showToast();
  });
}

// ============ TYPEWRITER SUBTITLE ============
const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
  const text = 'Product manager by day.';
  let i = 0;
  (function type() {
    typewriterEl.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(type, 55);
  })();
}

// ============ NAV: MOBILE COLLAPSE + SCROLL PROGRESS ============
const nav = document.querySelector('.nav');
const navExpandBtn = document.getElementById('navExpandBtn');
const scrollProgress = document.getElementById('scrollProgress');
const mobileQuery = window.matchMedia('(max-width: 640px)');
const NAV_COLLAPSE_THRESHOLD = 120;
let navManualExpand = false;

function updateNavCollapse() {
  if (!nav) return;
  const collapse = mobileQuery.matches && window.scrollY > NAV_COLLAPSE_THRESHOLD && !navManualExpand;
  nav.classList.toggle('nav-collapsed', collapse);
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const docHeight = html.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${docHeight > 0 ? window.scrollY / docHeight : 0})`;
}

if (nav) {
  mobileQuery.addEventListener('change', updateNavCollapse);

  if (navExpandBtn) {
    navExpandBtn.addEventListener('click', () => {
      navManualExpand = true;
      updateNavCollapse();
    });
  }

  nav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => { navManualExpand = false; });
  });
}

// One rAF-batched scroll handler for both, instead of layout work on every raw scroll event.
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    if (window.scrollY <= NAV_COLLAPSE_THRESHOLD) navManualExpand = false;
    updateNavCollapse();
    updateScrollProgress();
    scrollTicking = false;
  });
}, { passive: true });

updateNavCollapse();
updateScrollProgress();

// ============ ACTIVE NAV LINK ON SCROLL ============
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

if (navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === entry.target.id);
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
}

// ============ SCROLL-TRIGGERED REVEALS ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('reveal-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ============ STAT COUNT-UP ============
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  (function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  })(start);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));
