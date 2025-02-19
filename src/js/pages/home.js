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

  new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1: {
        slidesPerView: 2,
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 35,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1199: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  });
});
