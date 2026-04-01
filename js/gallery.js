// OPEN IMAGE
document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

// CLOSE
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}