document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let index = 0;

  function updateSlide() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", function () {
    index = (index + 1) % slides.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", function () {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlide();
  }, 3000);
});
