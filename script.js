document.addEventListener('DOMContentLoaded', function() {

    // Typed.js Initialization
    try {
        new Typed('.typed', {
            strings: [
                'Data Science & Machine Learning Enthusiast',
                'End-to-End ML Pipeline Builder',
                'Turning Data into Decisions'
            ],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            backDelay: 1700,
            contentType: 'text'
        });
    } catch (e) {
        const el = document.querySelector('.typed');
        if (el) el.textContent = 'Data Science & Machine Learning Enthusiast';
    }

    // AOS (Animate on Scroll) Initialization
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({
        duration: prefersReducedMotion ? 0 : 1000,
        once: true,
        disable: prefersReducedMotion
    });

    // Theme toggle (dark / light)
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') root.classList.add('dark');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            root.classList.toggle('dark');
            const mode = root.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', mode);
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
        // set initial icon
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = root.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('primary-navigation');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(open));
        });
        // Close nav when clicking a link (mobile)
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Smooth scroll with header offset is handled by CSS scroll-margin-top

    // Scrollspy: highlight active nav link
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const linkMap = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = linkMap.get(id);
            if (!link) return;
            if (entry.isIntersecting) {
                links.forEach(l => l.removeAttribute('aria-current'));
                link.setAttribute('aria-current', 'page');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(s => observer.observe(s));
});
