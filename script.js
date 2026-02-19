document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Horizontal Scroll with Mouse Wheel for Work Section
    const scrollContainer = document.querySelector('.horizontal-scroll-container');

    if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (evt) => {
            // Only hijack scroll if we are not at the edges or if it's strictly horizontal intent? 
            // Actually, for better UX, often best to just allow standard horizontal scroll via trackpad.
            // But for mouse wheel vertical -> horizontal mapping:

            if (window.innerWidth > 768) { // Only on desktop
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY;
            }
        });
    }

    // Glitch Text Effect (Random chracter swap)
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    glitchTexts.forEach(text => {
        const originalText = text.getAttribute('data-text');

        text.addEventListener('mouseover', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                text.innerText = text.innerText.split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }

                iterations += 1 / 3;
            }, 30);
        });
    });

    // Mouse move effect for spotlight
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update CSS variables for radial gradient center
        document.documentElement.style.setProperty('--cursor-x', `${x}px`);
        document.documentElement.style.setProperty('--cursor-y', `${y}px`);
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // Project Hover Reveal
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const imageSrc = card.getAttribute('data-image');
        if (imageSrc) {
            // Set as background variable
            card.style.setProperty('--project-bg', `url('${imageSrc}')`);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Arrow Navigation Logic
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const scrollContainerWork = document.querySelector('.horizontal-scroll-container');

    if (scrollContainerWork) {
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                scrollContainerWork.scrollBy({ left: 400, behavior: 'smooth' });
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                scrollContainerWork.scrollBy({ left: -400, behavior: 'smooth' });
            });
        }
    }
});
