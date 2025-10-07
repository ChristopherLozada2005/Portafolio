// Animación para mostrar secciones al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
  const animatedEls = document.querySelectorAll('.fade-in, .slide-up');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach(el => observer.observe(el));
});

// Puedes agregar más interacción aquí si lo necesitas.