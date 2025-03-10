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

locoinitialize()