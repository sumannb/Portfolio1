function locoinitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#home"),
        smooth: true,
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const footer = document.querySelector("#footbg");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Change nav links color when #footer is in view
                    navLinks.forEach((link) => {
                    link.classList.add("footer-active")
                    link.childNodes.forEach(function(line){
                        line.classList = "footer-activeLine"
                    })
                    });
                } else {
                    // Reset when footer is out of view
                    navLinks.forEach((link) => {
                        link.classList.remove("footer-active")
                        link.childNodes.forEach(function(line){
                            line.classList = "line"
                        })
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

// Animate section titles
document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Animate experience cards
document.querySelectorAll('.experience-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

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