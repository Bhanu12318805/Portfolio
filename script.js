document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'dark');
            updateIcon('dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
            updateIcon('light');
        }
    });

    function updateIcon(theme) {
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');
    let menuOpen = false;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                navLinksList.style.cssText = `
                    display:flex; flex-direction:column; position:absolute;
                    top:70px; left:0; width:100%; gap:1rem;
                    background:rgba(5,10,7,0.97); padding:1rem 2rem; z-index:999;
                `;
            } else {
                navLinksList.style.display = 'none';
            }
        });
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                navLinksList.style.display = 'none';
            });
        });
    }

    // 4. Project Filters
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                card.style.display =
                    (filter === 'all' || card.getAttribute('data-category') === filter)
                    ? '' : 'none';
            });
        });
    });

});

// Typing animation
const text = "Hello and Welcome 👋";
let idx = 0;
function typeText() {
    const el = document.getElementById("typing-text");
    if (el && idx < text.length) {
        el.innerHTML += text.charAt(idx);
        idx++;
        setTimeout(typeText, 80);
    }
}
window.addEventListener('load', typeText);