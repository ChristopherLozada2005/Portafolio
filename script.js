// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarLinks = document.querySelector('.navbar-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navbarLinks.classList.remove('active');
    mobileMenuToggle?.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
// ===== NAV-LINK ACTIVE =====
function setActiveNavLink() {
  const hash = window.location.hash || '#inicio';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', setActiveNavLink);
window.addEventListener('DOMContentLoaded', setActiveNavLink);
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = 'none';
  } else {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  }
  
  lastScroll = currentScroll;
});

// ===== COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
};

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Animate counters when hero section is visible
      if (entry.target.classList.contains('hero-stats')) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .competencia-card, .project-card, .highlight-item').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    // Show success message (in a real app, you'd send this to a server)
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>¡Mensaje enviado con éxito! Te responderé pronto.</p>
    `;
    successMessage.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
      color: white;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 15px;
      z-index: 10000;
      animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
      successMessage.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => {
        successMessage.remove();
      }, 500);
    }, 5000);
  });
}

// ===== TYPING EFFECT =====
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
  const text = typingElement.textContent;
  typingElement.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect after page load
  setTimeout(typeWriter, 1500);
}

// ===== PARALLAX EFFECT FOR FLOATING SHAPES =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.floating-shape');
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== CURSOR GLOW EFFECT =====
const createCursorGlow = () => {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    display: none;
  `;
  document.body.appendChild(glow);
  
  document.addEventListener('mousemove', (e) => {
    glow.style.display = 'block';
    glow.style.left = e.clientX - 10 + 'px';
    glow.style.top = e.clientY - 10 + 'px';
  });
  
  // Hide on mobile
  if (window.innerWidth < 768) {
    glow.style.display = 'none';
  }
};

// Initialize cursor glow on desktop
if (window.innerWidth >= 768) {
  createCursorGlow();
}

// ===== ADD ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== CONSOLE MESSAGE =====
console.log('%c👋 ¡Hola! Soy Christopher Lozada', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c💻 Desarrollador Full Stack apasionado por crear experiencias digitales increíbles', 'color: #7c3aed; font-size: 14px;');
console.log('%c🔗 Conectemos: https://www.linkedin.com/in/christopher-lozada/', 'color: #00d4ff; font-size: 12px;');