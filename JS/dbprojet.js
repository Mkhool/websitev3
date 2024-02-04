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
