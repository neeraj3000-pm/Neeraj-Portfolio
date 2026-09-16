// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const toast = document.getElementById('achievementToast');
const toastTitle = document.getElementById('toastTitle');
const toastText = document.getElementById('toastText');

// Load saved theme (in-memory for this session, since artifacts can't use localStorage —
// but this is a real static site, so localStorage works fine once deployed)
function getSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) { /* ignore if unavailable */ }
}

const savedTheme = getSavedTheme();
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    saveTheme(next);

    if (next === 'dark') {
      showToast('ACHIEVEMENT UNLOCKED', 'Welcome to the dark side.');
    }
    // switching to light: no toast, just switches quietly
  });
}

function showToast(title, message) {
  if (!toast) return;
  toastTitle.textContent = title;
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ============ TYPEWRITER SUBTITLE ============
const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
  const phrases = ['Product manager by day.'];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const PAUSE_AFTER_TYPE = 2200;
  const PAUSE_AFTER_DELETE = 500;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        if (phrases.length > 1) {
          deleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
        }
        // if only one phrase, just stop typing (cursor keeps blinking)
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      typewriterEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

// ============ SCROLL PROGRESS BAR ============
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ============ ACTIVE NAV LINK ON SCROLL ============
const trackedSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

if (trackedSections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  trackedSections.forEach((section) => observer.observe(section));
}

// ============ SCROLL-TRIGGERED REVEALS ============
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
}

// ============ STAT COUNT-UP ============
const countEls = document.querySelectorAll('[data-count]');

if (countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach((el) => countObserver.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }
  requestAnimationFrame(tick);
}
