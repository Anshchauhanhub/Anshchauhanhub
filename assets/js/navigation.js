 // Menu functions
function toggleMenu() {
    const menu = document.getElementById('slideMenu');
    const overlay = document.getElementById('menuOverlay');
    const menuToggle = document.getElementById('menuToggle');

    menu.classList.add('active');
    overlay.classList.add('active');
    menuToggle.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const menu = document.getElementById('slideMenu');
    const overlay = document.getElementById('menuOverlay');
    const menuToggle = document.getElementById('menuToggle');

    menu.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
}

// Smooth scroll
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

// Close menu with escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMenu();
        if (document.getElementById('chatbotContainer').classList.contains('active')) {
            toggleChatbot();
        }
    }
});

// Handle resize
window.addEventListener('resize', function () {
    closeMenu();
});

