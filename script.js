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

document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero-section");
  const introText = document.querySelector("#intro-text");
  const conclusionText = document.querySelector("#conclusion-text");
  const highlightTextStrongElements = document.querySelectorAll(
    "#highlight-text strong"
  );

  // Fonction pour changer la couleur des éléments <strong>
  function changeStrongElementsColor(color) {
    highlightTextStrongElements.forEach(function (element) {
      element.style.color = color;
    });
  }

  // Ajoute un écouteur d'événements pour l'entrée de la souris (mouseenter) sur .hero-section
  heroSection.addEventListener("mouseenter", function () {
    introText.style.filter = "blur(30px)";
    conclusionText.style.filter = "blur(30px)";
    changeStrongElementsColor("#1cc49d"); // Change la couleur en #1cc49d
  });

  // Ajoute un écouteur d'événements pour la sortie de la souris (mouseleave) sur .hero-section
  heroSection.addEventListener("mouseleave", function () {
    introText.style.filter = "";
    conclusionText.style.filter = "";
    changeStrongElementsColor(""); // Réinitialise la couleur des éléments <strong>
  });
});
