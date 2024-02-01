const spotlight = document.querySelector(".spotlight");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  spotlight.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  spotlight.style.opacity = 1;
});

document.addEventListener("mouseleave", () => {
  spotlight.style.opacity = 0;
});

// Récupérer toutes les sections
const sections = document.querySelectorAll("section");

// Récupérer tous les liens de la barre latérale
const sidebarLinks = document.querySelectorAll(".sidebar a");

// Écoutez l'événement de défilement
window.addEventListener("scroll", () => {
  // Obtenez la position de défilement actuelle
  const scrollY = window.scrollY;

  // Bouclez à travers chaque section et vérifiez si elle est dans la vue
  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Ajoutez la classe "active" à la section correspondante
      section.classList.add("active");

      // Ajoutez également la classe "active" au lien de la barre latérale correspondant
      sidebarLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId.toLowerCase()}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    } else {
      // Supprimez la classe "active" des sections qui ne sont pas dans la vue
      section.classList.remove("active");
    }
  });
});
