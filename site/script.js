// ============================
// SHASHI_IOT Portfolio Scripts
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------
    // 1. Scroll-triggered fade-in
    // ----------------------------
    const faders = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    faders.forEach(el => fadeObserver.observe(el));

    // ----------------------------
    // 2. Sticky header on scroll
    // ----------------------------
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------
    // 3. Back-to-top button
    // ----------------------------
    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.innerHTML = '&#8593;';
    topBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----------------------------
    // 4. Smooth scroll for nav links
    // ----------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile nav if open
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle) navToggle.checked = false;
            }
        });
    });

    // ----------------------------
    // 5. Active nav link highlight
    // ----------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.borderColor = 'transparent';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#ffeb3b';
                        link.style.borderColor = '#ffeb3b';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // ----------------------------
    // 6. Typing effect for greeting
    // ----------------------------
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const original = greeting.innerHTML;
        greeting.innerHTML = '';
        greeting.style.visibility = 'visible';

        let i = 0;
        const plainText = greeting.textContent || '';
        
        // Restore original after a brief typing animation
        const typeSpeed = 40;
        const tempSpan = document.createElement('span');
        greeting.appendChild(tempSpan);

        const typeWriter = () => {
            if (i < plainText.length) {
                tempSpan.textContent += plainText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Replace with the original styled HTML
                greeting.innerHTML = original;
            }
        };

        // Only run if the element is in the viewport on load
        const rect = greeting.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            typeWriter();
        } else {
            greeting.innerHTML = original;
        }
    }
});
