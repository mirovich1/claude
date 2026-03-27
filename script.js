/* ============================================================
   NATALIA LISOHURSKA — PORTFOLIO SCRIPTS
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV: frosted glass on scroll ── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE NAV toggle ── */
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── HERO WORD CYCLE ── */
  const words = document.querySelectorAll('.role-word');
  if (words.length > 1) {
    let current = 0;
    setInterval(() => {
      words[current].classList.remove('active');
      words[current].classList.add('exit');
      const prev = current;
      current = (current + 1) % words.length;
      words[current].classList.add('active');
      setTimeout(() => {
        words[prev].classList.remove('exit');
      }, 500);
    }, 2800);
  }

  /* ── STAT COUNTER ANIMATION ── */
  const stats = document.querySelectorAll('.stat-value');
  const parseStatValue = (el) => {
    const text = el.textContent.replace(/[^0-9.]/g, '');
    return parseFloat(text) || 0;
  };
  const formatStatValue = (el, val) => {
    const original = el.dataset.original;
    if (original.startsWith('$')) {
      if (original.includes('M')) return `$${Math.round(val)}M`;
      return `$${Math.round(val)}`;
    }
    return String(Math.round(val));
  };

  const animateStat = (el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const suffix = el.querySelector('.stat-suffix');
    const suffixText = suffix ? suffix.outerHTML : '';
    const textOnly = el.textContent;
    el.dataset.original = textOnly;
    const target = parseStatValue(el);
    if (target === 0) return;

    const duration = 1400;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      el.innerHTML = formatStatValue(el, value) + suffixText;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach(el => statIO.observe(el));
  }

  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--text)'
        : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

})();
