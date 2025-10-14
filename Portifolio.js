// Animação suave nos cards, botão CTA scroll, e highlight na timeline
const scrollToPortfolio = () => {
    document.querySelector('#portfolio').scrollIntoView({behavior: 'smooth'});
}
document.querySelector('.cta-btn').addEventListener('click', scrollToPortfolio);

// Hover animado nas .timeline-item
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.background = '#28395b';
        item.style.transition = '.17s';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = 'none';
    });
});

// Efeito fade-in nas .card de projetos
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.card').forEach((card,i)=>{
    setTimeout(()=>{
      card.style.opacity=1;
      card.style.transform='translateY(0)';
    },600+i*160)
  });
});

// Inicialmente cards ocultos para animação
document.querySelectorAll('.card').forEach(card=>{
  card.style.opacity=0
  card.style.transform='translateY(44px)'
});


