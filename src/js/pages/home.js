import { renderEventsList } from "../helpers/renderEventsList.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async function () {
  initImageSlider();
  await initCustomSlider();
});

function initImageSlider() {
  const slider = document.querySelector("#slider .slider-wrapper");
  const slides = slider.querySelectorAll(".slide");
  const prevBtn = document.querySelector("#slider .prev");
  const nextBtn = document.querySelector("#slider .next");

  let index = 0;

  function updateSlide() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });
}

async function initCustomSlider() {
  const container = document.querySelector("#popular-events");
  const track = container.querySelector(".slider-track");
  const prevBtn = container.querySelector(".nav.prev");
  const nextBtn = container.querySelector(".nav.next");

  const apiResponse = await controller.getAll(endpoints.events);
  renderEventsList(apiResponse.data);

  let slides = container.querySelectorAll(".swiper-slide");
  const totalSlides = slides.length;

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();

  // Clone first and last few slides for looping
  function cloneSlides() {
    const fragmentStart = document.createDocumentFragment();
    const fragmentEnd = document.createDocumentFragment();

    for (let i = 0; i < slidesPerView; i++) {
      const firstClone = slides[i].cloneNode(true);
      const lastClone = slides[slides.length - 1 - i].cloneNode(true);

      firstClone.classList.add("clone");
      lastClone.classList.add("clone");

      fragmentEnd.appendChild(firstClone);
      fragmentStart.insertBefore(lastClone, fragmentStart.firstChild);
    }

    track.appendChild(fragmentEnd);
    track.insertBefore(fragmentStart, track.firstChild);
  }

  cloneSlides();

  // Refresh slides after cloning
  slides = container.querySelectorAll(".swiper-slide");
  currentIndex = slidesPerView;

  function getSlidesPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 3;
    return 5;
  }

  function updateSlider(animate = true) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.3s ease";

    const offset = slideWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function moveNext() {
    currentIndex++;
    updateSlider();

    if (currentIndex === slides.length - slidesPerView) {
      setTimeout(() => {
        currentIndex = slidesPerView;
        updateSlider(false);
      }, 300);
    }
  }

  function movePrev() {
    currentIndex--;
    updateSlider();

    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = slides.length - slidesPerView * 2;
        updateSlider(false);
      }, 300);
    }
  }

  nextBtn.addEventListener("click", moveNext);
  prevBtn.addEventListener("click", movePrev);

  window.addEventListener("resize", () => {
    slidesPerView = getSlidesPerView();
    updateSlider(false);
  });

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      const eventID = slide.getAttribute("data-id");
      window.location.href = `./details.html?id=${eventID}`;
    });
  });

  updateSlider(false);

  let autoPlayInterval;

  function startAutoplay() {
    autoPlayInterval = setInterval(() => {
      moveNext();
    }, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoPlayInterval);
  }

  startAutoplay();

  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);
}
