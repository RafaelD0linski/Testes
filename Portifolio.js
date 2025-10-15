// script.js
// Exemplo: Suave scroll ao clicar no menu
document.querySelectorAll('nav.menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 22,
                behavior: 'smooth'
            });
        }
    });
});
