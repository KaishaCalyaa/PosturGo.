document.addEventListener('DOMContentLoaded', () => {
  // ===== Element Selection =====
  const preloader = document.querySelector('.preloader');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const navbar = document.querySelector('.header');
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const currentYear = document.getElementById('current-year');
  const tabButtons = document.querySelectorAll('.tab-btn');
  // const contactForm = document.getElementById('contact-form'); // DIHAPUS: Karena ID ini sudah dihapus di HTML
  const newsletterForm = document.getElementById('newsletter-form');
  const qnaQuestions = document.querySelectorAll('.qna-question');

  // ===== Preloader =====
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });

  // ===== Navbar Scroll & Scroll-to-Top Button =====
  const handleScroll = () => {
    // Show/hide scroll-to-top button and add scrolled class to navbar
    // PERBAIKAN: Nilai diubah dari 300 menjadi 50 agar header lebih responsif
    if (window.scrollY > 50) { 
      scrollTopBtn.classList.add('show');
      navbar.classList.add('scrolled');
    } else {
      scrollTopBtn.classList.remove('show');
      navbar.classList.remove('scrolled');
    }

    // Active Nav Link on Scroll
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  // ===== Mobile Menu =====
  const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  mobileMenu.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ===== Update Copyright Year =====
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ===== Tabbed Solutions Section =====
  if (tabButtons.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Deactivate all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Activate clicked button and corresponding pane
        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
      });
    });
  }

  // ===== Q&A Accordion =====
  if (qnaQuestions.length) {
    qnaQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const parentItem = question.parentElement;
        const wasActive = parentItem.classList.contains('active');

        // Close all open items
        document.querySelectorAll('.qna-item').forEach(item => {
          item.classList.remove('active');
        });

        // If it wasn't active before, open it
        if (!wasActive) {
          parentItem.classList.add('active');
        }
      });
    });
  }
    
  // ===== Contact Form Handling =====
  // BLOK KODE PENANGANAN FORMULIR KONTAK DIHAPUS TOTAL DI SINI AGAR FORMSPREE BISA BERFUNGSI.

  // ===== Newsletter Form Handling =====
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih telah berlangganan!');
      newsletterForm.reset();
    });
  }

  // ===== DYNAMIC SCROLL ANIMATION =====
  const animatedElements = document.querySelectorAll('.section-header, .stat-card, .about-image, .about-item, .feature-card, .solution-content, .testimonial-card, .team-card, .qna-item, .contact-info, .contact-form-container');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Automatically add the base animation class and observe the element
  animatedElements.forEach(el => {
    el.classList.add('fade-in-up'); // Add a default animation class
    observer.observe(el);
  });

  // A different animation for the about image
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    aboutImage.classList.remove('fade-in-up');
    aboutImage.classList.add('fade-in');
  }

  // Partnership Click Handler
window.handlePartnerClick = function(partnerName) {
  const partnerInfo = {
    'UNS': {
      name: 'Universitas Sebelas Maret',
      description: 'Kerja sama dalam penelitian dan pengembangan teknologi kesehatan kerja',
      url: 'https://uns.ac.id/id/'
    },
    'Enuma': {
      name: 'Enuma Technology',
      description: 'Partner teknologi untuk pengembangan platform AI dan machine learning',
      url: 'https://enumatechnology.com/'
    },
    'LPSKE': {
      name: 'LPSKE',
      description: 'Lembaga Pengembangan Sertifikasi Kompetensi dan Edukasi',
      url: '#'
    },
    'Green': {
      name: 'Green Partner',
      description: 'Komitmen bersama dalam menciptakan lingkungan kerja yang berkelanjutan',
      url: 'green.html'
    }
  };

  const partner = partnerInfo[partnerName];
  
  // Open directly without confirmation or notifications
  if (partner && partner.url && partner.url !== '#') {
    window.open(partner.url, '_blank');
  }
}

// Add ripple effect on partner card click
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.partner-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(4, 114, 197, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Tooltip for partner description on hover
document.addEventListener('DOMContentLoaded', function() {
  // Create tooltip element once
  const tooltip = document.createElement('div');
  tooltip.id = 'partner-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.padding = '8px 10px';
  tooltip.style.background = 'rgba(0,0,0,0.8)';
  tooltip.style.color = '#fff';
  tooltip.style.fontSize = '12px';
  tooltip.style.borderRadius = '6px';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.zIndex = '9999';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 120ms ease';
  document.body.appendChild(tooltip);

  const getPartnerNameFromOnclick = (el) => {
    const oc = el.getAttribute('onclick') || '';
    // Expect format: handlePartnerClick('NAME')
    const match = oc.match(/handlePartnerClick\('([^']+)'\)/);
    return match ? match[1] : null;
  };

  const partnerInfo = {
    'UNS': {
      description: 'Kerja sama dalam penelitian dan pengembangan teknologi kesehatan kerja'
    },
    'Enuma': {
      description: 'Partner teknologi untuk pengembangan platform AI dan machine learning'
    },
    'LPSKE': {
      description: 'Lembaga Pengembangan Sertifikasi Kompetensi dan Edukasi'
    },
    'Green': {
      description: 'Komitmen bersama dalam menciptakan lingkungan kerja yang berkelanjutan'
    }
  };

  const showTooltip = (text, x, y) => {
    tooltip.textContent = text;
    const offset = 12;
    tooltip.style.left = (x + offset) + 'px';
    tooltip.style.top = (y + offset) + 'px';
    tooltip.style.opacity = '1';
  };

  const hideTooltip = () => {
    tooltip.style.opacity = '0';
  };

  document.querySelectorAll('.partner-card').forEach(card => {
    let currentDesc = '';
    card.addEventListener('mouseenter', (e) => {
      const name = getPartnerNameFromOnclick(card);
      if (!name) return;
      currentDesc = (partnerInfo[name] && partnerInfo[name].description) ? partnerInfo[name].description : '';
      if (!currentDesc) return;
      showTooltip(currentDesc, e.clientX, e.clientY);
    });
    card.addEventListener('mousemove', (e) => {
      if (!currentDesc) return;
      showTooltip(currentDesc, e.clientX, e.clientY);
    });
    card.addEventListener('mouseleave', () => {
      currentDesc = '';
      hideTooltip();
    });
  });
});

});