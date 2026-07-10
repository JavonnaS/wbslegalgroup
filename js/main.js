/* ===================================================
   WBS Legal Group – Main JavaScript
   =================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Navigation Toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Contact Form Validation ---------- */
  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      function validate(id, errorId, msg) {
        var field = document.getElementById(id);
        var error = document.getElementById(errorId);
        var value = field ? field.value.trim() : '';
        if (!value) {
          if (field) field.classList.add('is-invalid');
          if (error) error.textContent = msg;
          valid = false;
        } else {
          if (field) field.classList.remove('is-invalid');
          if (error) error.textContent = '';
        }
      }

      function validateEmail(id, errorId) {
        var field = document.getElementById(id);
        var error = document.getElementById(errorId);
        var value = field ? field.value.trim() : '';
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) {
          if (field) field.classList.add('is-invalid');
          if (error) error.textContent = value ? 'Please enter a valid email address.' : 'Email address is required.';
          valid = false;
        } else {
          if (field) field.classList.remove('is-invalid');
          if (error) error.textContent = '';
        }
      }

      validate('name', 'nameError', 'Full name is required.');
      validateEmail('email', 'emailError');
      validate('subject', 'subjectError', 'Please select a practice area.');
      validate('message', 'messageError', 'Please describe your legal matter.');

      if (valid) {
        var successEl = document.getElementById('formSuccess');
        form.reset();
        if (successEl) {
          successEl.hidden = false;
          successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(function () { successEl.hidden = true; }, 6000);
        }
      }
    });

    // Clear inline error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
        var errorEl = document.getElementById(field.id + 'Error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  }

  /* ---------- Static Footer Year (if span exists) ---------- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = '2026';
  }

}());
