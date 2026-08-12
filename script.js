window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary-fixed": "#7df4ff",
        "on-tertiary-fixed-variant": "#474746",
        "tertiary": "#f8f5f5",
        "secondary": "#e9b3ff",
        "primary-container": "#00f0ff",
        "on-tertiary-container": "#5f5e5e",
        "inverse-on-surface": "#313030",
        "secondary-container": "#7d01b1",
        "surface": "#131313",
        "inverse-surface": "#e5e2e1",
        "outline": "#849495",
        "on-tertiary-fixed": "#1b1c1c",
        "tertiary-container": "#dbd9d8",
        "on-secondary-fixed-variant": "#7200a3",
        "on-surface-variant": "#b9cacb",
        "on-primary-fixed": "#002022",
        "surface-container-highest": "#353534",
        "surface-tint": "#00dbe9",
        "error-container": "#93000a",
        "on-primary": "#00363a",
        "on-primary-container": "#006970",
        "surface-container-high": "#2a2a2a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
        "on-secondary": "#510074",
        "secondary-fixed-dim": "#e9b3ff",
        "surface-container-low": "#1c1b1b",
        "outline-variant": "#3b494b",
        "background": "#131313",
        "inverse-primary": "#006970",
        "on-background": "#e5e2e1",
        "on-primary-fixed-variant": "#004f54",
        "surface-variant": "#353534",
        "surface-container": "#201f1f",
        "surface-bright": "#393939",
        "error": "#ffb4ab",
        "on-secondary-container": "#e5a9ff",
        "surface-container-lowest": "#0e0e0e",
        "primary": "#dbfcff",
        "on-surface": "#e5e2e1",
        "primary-fixed-dim": "#00dbe9",
        "on-tertiary": "#303030",
        "secondary-fixed": "#f6d9ff",
        "tertiary-fixed-dim": "#c8c6c5",
        "surface-dim": "#131313",
        "tertiary-fixed": "#e4e2e1",
        "on-secondary-fixed": "#310048"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "margin-desktop": "64px",
        "margin-mobile": "16px",
        "container-max": "1440px",
        "gutter": "24px",
        "unit": "4px"
      },
      "fontFamily": {
        "code-data": ["JetBrains Mono"],
        "display-lg-mobile": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "code-label": ["JetBrains Mono"],
        "body-lg": ["Inter"],
        "body-sm": ["Inter"]
      },
      "fontSize": {
        "code-data": ["14px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
        "display-lg-mobile": ["40px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
        "headline-md": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800"}],
        "code-label": ["13px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
        "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}]
      }
    }
  }
};

function setMobileNavExpanded(isOpen) {
  const toggle = document.getElementById('mobile-nav-toggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function openMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  if (!nav || !backdrop) return;
  nav.classList.add('open');
  backdrop.classList.add('open');
  document.body.classList.add('no-scroll');
  setMobileNavExpanded(true);
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  if (!nav || !backdrop) return;
  nav.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.classList.remove('no-scroll');
  setMobileNavExpanded(false);
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return;
  const isOpen = !nav.classList.contains('open');
  if (isOpen) {
    openMobileNav();
  } else {
    closeMobileNav();
  }
}

function initTypewriter(headline, text) {
  headline.innerHTML = '<span class="typewriter-cursor">_</span>';
  let i = 0;
  let isTag = false;
  let textBuffer = '';

  function typeWriter() {
    if (i < text.length) {
      const char = text.charAt(i);
      if (char === '<') {
        isTag = true;
      }
      textBuffer += char;
      if (char === '>') {
        isTag = false;
      }
      if (!isTag) {
        headline.innerHTML = textBuffer + '<span class="typewriter-cursor">_</span>';
        setTimeout(typeWriter, Math.random() * 50 + 50);
      } else {
        setTimeout(typeWriter, 0);
      }
      i++;
    }
  }

  setTimeout(typeWriter, 500);
}

function initRevealSections() {
  const sections = document.querySelectorAll('.reveal-section');
  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-nav-toggle');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('#mobile-nav a');

  if (toggle) {
    toggle.addEventListener('click', toggleMobileNav);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMobileNav);
  }

  navLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMobileNav();
    }
  });

  const headline = document.getElementById('typewriter-headline');
  const fullText = headline ? headline.getAttribute('data-text') : '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (headline && fullText) {
    if (prefersReducedMotion) {
      headline.innerHTML = fullText;
    } else {
      initTypewriter(headline, fullText);
    }
  }

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-section').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
    });
  } else {
    initRevealSections();
  }
});
