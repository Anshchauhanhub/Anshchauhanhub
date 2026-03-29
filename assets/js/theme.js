 
// Theme Toggle Function - Dark is now DEFAULT
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
}

function updateThemeIcon(isLight) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        if (isLight) {
            // When light theme is active, show moon icon (to switch back to dark)
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            // When dark theme is active, show sun icon (to switch to light)
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// Load saved theme on page load - Default to DARK
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    
    if (isLight) {
        document.body.classList.add('light-theme');
    }
    // If no saved theme or saved theme is 'dark', keep default (dark)
    
    updateThemeIcon(isLight);
});
