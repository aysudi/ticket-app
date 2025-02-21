import { renderEventsList } from "../helpers/renderEventsList.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async function () {
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
        spaceBetween: 20,
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

  const apiResponse = await controller.getAll(endpoints.events);
  renderEventsList(apiResponse.data);

  const eventsSlides = document.querySelectorAll(".swiper-slide");
  eventsSlides.forEach((event) => {
    event.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const eventID = event.getAttribute("data-id");
      url.searchParams.set("id", eventID);
      window.location.href = `./details.html?id=${eventID}`;
    });
  });
});
