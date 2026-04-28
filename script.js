document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const glow = document.querySelector('.glow-overlay');

    // Custom Cursor Movement
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Outline follows with delay (handled by CSS transition usually, but can be JS)
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });

        // Update glow position
        document.documentElement.style.setProperty('--mouse-x', `${posX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${posY}px`);
    });

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            outline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
            outline.style.borderColor = 'var(--accent-primary)';
        });
    });

    // Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal classes and observe
    document.querySelectorAll('section, .portfolio-item').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    // Add necessary CSS for reveal to the head
    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .reveal-init.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
