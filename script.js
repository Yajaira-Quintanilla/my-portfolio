const menuButton = document.querySelector(".menu-toggle");
const navs = document.querySelectorAll(".nav");
menuButton.addEventListener("click", () => {
  const opening = !navs[0].classList.contains("open");
  navs.forEach(nav => nav.classList.toggle("open", opening));
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  navs.forEach(nav => nav.classList.remove("open"));
  menuButton.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();

// ANIMACIONES AL DESPLAZARSE POR LA PÁGINA
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

// Elementos que tendrán animación
document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// TULIP CURSOR WITH SPARKLE TRAIL
const tulip = document.querySelector(".tulip-cursor");

if (tulip && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    let lastX = 0;
    let lastY = 0;

    document.addEventListener("mousemove", (e) => {

        tulip.style.left = e.clientX + "px";
        tulip.style.top = e.clientY + "px";

        const distance = Math.hypot(
            e.clientX - lastX,
            e.clientY - lastY
        );

        if (distance > 12) {

            const sparkle = document.createElement("span");

            sparkle.className = "cursor-trail";

            const symbols = ["✧", "✦", "⋆", "·"];
            sparkle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";

            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 800);

            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
}

// DYNAMIC NAVIGATION
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");

// Change navbar when scrolling
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});

// Highlight the current section
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-25% 0px -65% 0px"
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});