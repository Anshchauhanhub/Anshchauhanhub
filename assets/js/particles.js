// Create floating particles
function createParticles() {
    if (window.innerWidth <= 768) return;
    const particleContainer = document.getElementById("particles");
    const particleCount = window.innerWidth > 1024 ? 200 : 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 2 + "s";
        particle.style.animationDuration = (Math.random() * 3 + 3) + "s";
        particleContainer.appendChild(particle);
    }
}

// Handle resize for particles
window.addEventListener('resize', function () {
    const particleContainer = document.getElementById("particles");
    if (particleContainer) {
        particleContainer.innerHTML = '';
        createParticles();
    }
});

