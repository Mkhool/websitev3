const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".close-button");

// Ouvre la boîte à lumière avec l'image cliquée
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const image = item.querySelector(".gallery-image");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.style.display = "block";
  });
});

// Ferme la boîte à lumière en cliquant sur le bouton de fermeture
closeButton.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Ferme la boîte à lumière en cliquant à l'extérieur de l'image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
