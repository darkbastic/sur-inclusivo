document.addEventListener('DOMContentLoaded', () => {
  /* ===== THEME TOGGLE ===== */
  const themeBtn = document.getElementById('theme-btn');
  const body = document.body;

  // Sync with local storage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.textContent = '☀️';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = body.getAttribute('data-theme') === 'dark';
      if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '🌙';
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '☀️';
      }
    });
  }

  /* ===== MOBILE MENU TOGGLE ===== */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link (optional for single page, good for consistency)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
      });
    });
  }

  /* ===== MODAL (APOYO PSICOLÓGICO) ===== */
  const helpBtn = document.getElementById('btn-ayuda');
  const modal = document.getElementById('modal-ayuda');
  const closeModal = document.querySelector('.modal-close');

  if (helpBtn && modal) {
    helpBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  /* ===== MAP INTERACTIVITY (MAPA DE LA SEDE) ===== */
  const mapPoints = document.querySelectorAll('.map-point');
  if (mapPoints.length > 0) {
    mapPoints.forEach(point => {
      point.addEventListener('click', () => {
        const label = point.getAttribute('data-label');
        showToast(`📍 Ubicación seleccionada: ${label}`);
      });
    });
  }

  /* ===== TOASTS ===== */
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ===== ACTIVE LINK HIGHLIGHT ===== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
