function locoinitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#home"),
        smooth: true,
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const footer = document.querySelector("#footbg");

    // Store the initially active link
    const activeLink = document.querySelector(".nav-link.footer-active");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Change nav links color when #footer is in view
                    navLinks.forEach((link) => {
                        // Don't override the static active link
                        if (link !== activeLink) {
                            link.classList.add("footer-active");
                            link.childNodes.forEach(function (line) {
                                line.classList = "footer-activeLine";
                            });
                        }
                    });
                } else {
                    // Reset when footer is out of view, but preserve the active link
                    navLinks.forEach((link) => {
                        // Don't remove the class from the static active link
                        if (link !== activeLink) {
                            link.classList.remove("footer-active");
                            link.childNodes.forEach(function (line) {
                                line.classList = "line";
                            });
                        }
                    });
                }
            });
        },
        { root: null, threshold: 0.1 } // Adjust threshold as needed
    );

    observer.observe(footer);
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Remove animations for section titles
// All section titles will be visible by default

// Experience cards are now always visible - no animation
// Removed the animation code for experience cards

// Animate portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        }
    });
});

// Add hover effect to experience cards
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add hover effect to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

locoinitialize()