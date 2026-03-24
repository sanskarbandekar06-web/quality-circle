// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a number counter, start counting
                if (entry.target.classList.contains('count-card')) {
                    const numberEl = entry.target.querySelector('.count-number');
                    if (numberEl) {
                        const target = parseInt(numberEl.getAttribute('data-target'), 10);
                        animateValue(numberEl, 0, target, 2000);
                    }
                }
                
                // Unobserve so animation happens only once
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .count-card');
    animatedElements.forEach(el => observer.observe(el));

    // Number Counter Animation Function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // using easeOutQuart effect
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeOutQuart * (end - start) + start);
            
            // Format number safely
            obj.innerHTML = currentVal.toString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toString();
            }
        };
        window.requestAnimationFrame(step);
    }
});
