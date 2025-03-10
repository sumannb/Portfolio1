function valueSetters() {
    gsap.set("nav a", {y: "-100%", opacity: 0})
    gsap.set("#home span .child", {
        y: "100%"
    })
    gsap.set("#home .row img", {
        opacity: 0
    })

    gsap.set("#home #imagery", {
        opacity: 0
    })
}

function revealToSpan(){
    gsap.set("nav", {opacity: 0, height: 0})
    document.querySelectorAll(".reveal")
        .forEach(function(elem) {
            let parent = document.createElement("span")
            let child = document.createElement("span")
            parent.classList.add("parent")
            child.classList.add("child")

            child.innerHTML = elem.innerHTML
            parent.appendChild(child)

            elem.innerHTML = ""
            elem.appendChild(parent)
        }
    )
}

function loadingAnimation(){
    var tl = gsap.timeline()
    tl
    .from("#loader .child .lText", {
        x: 160,
        duration: 1,
        ease: Power3.easeInOut
    })
    .from("#loader .child .fText", {
        x: 60,
        duration: 1,
        delay: -0.9,
        ease: Power3.easeInOut
    })
    .to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        delay: 0.5,
        ease: Power3.easeInOut
    })
    .to("#loader", {
        height: 0,
        duration: 1,
        ease: Power3.easeOut,
        onComplete: function() {
            animateHomePage()
        }
    })
    .to("#green", {
        height: "10%",
        top: 0,
        duration: 1,
        delay: -1.15,
        ease: Power3.easeOut,
    })
    .to("#green", {
        height: "0%",
        duration: 2,
        delay: -1,
        stagger: 0.5,
        ease: Power3.easeOut,
    })
    .to("nav", {
        opacity: 1,
        delay: -1
    })
    .to("#home",{
        position: "relative",
        delay: -0.5
    })
    
}


// function animateSvg(){
//     gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
//         strokeDashoffset: 0,
//         duration: 3,
//         delay: -1,
//         ease: Power3.easeInOut,
//     })
// }

// function animateSVG(){
//     const pathAll = document.querySelectorAll("#uxSvg path")
    
//     pathAll.forEach((path)=>{
//         console.log(path.getTotalLength())
//     })
// }


function animateHomePage() {
    var tl = gsap.timeline()
    tl
    .to("#home .parent .child", {
        y: 0,
        stagger: .1,
        duration: 1,
        delay: -0.5,
        ease: Expo.easeInOut
    })
    .to("nav a", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: -1,
        ease: Power3.easeInOut
    })
    .to("#home .row img", {
        opacity: 1,
        delay: -1,
        ease: Expo.easeInOut, 
        onComplete: function(){
            // animateSvg()
            animateImagery()
        }
    })
}

function animateImagery(){
    gsap
    .to("#imagery", {
        opacity: 1,
        duration: 2,
        ease: Expo.easeInOut,
    })
}

// function locoinitialize() {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector("#home"),
//         smooth: true,
//     });
// }

function cardHoverEffect() {
    document.querySelectorAll(".cnt")
    .forEach(function (cnt) {
        var showingImage;
        cnt.addEventListener("mousemove", function(dets){
            showingImage = dets.target
            showingImage.style.filter = "grayscale(1)"
            document.querySelector("#home").style.backgroundColor = "#" + dets.target.dataset.color
        })

        cnt.addEventListener("mouseleave", function(dets){
            showingImage.style.filter = "grayscale(0)"
            document.querySelector("#home").style.backgroundColor = "#fcfaf8"
        })
    })
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

revealToSpan()
valueSetters()
loadingAnimation()
// locoinitialize()
cardHoverEffect()

