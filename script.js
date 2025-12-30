// script.js - small interactive helpers for portfolio

// Set current year in footer and wire up interactivity
document.addEventListener('DOMContentLoaded', function () {
  // Update year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Smooth scrolling for internal links (already supported by CSS, but enhance for browsers)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close nav on link click (mobile)
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => obs.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('is-visible'));
  }
});
