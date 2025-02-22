export function renderEventsList(arr) {
  const events = document.querySelector(".events");
  events.innerHTML = "";
  arr.forEach((event) => {
    events.innerHTML += `
    <div data-id=${event.id} class="swiper-slide">
              <div class="img-box">
                <img
                  src="${event.posterURL}"
                  alt=""
                />
                <span>${event.price}$</span>
              </div>
              <div class="text-box">
                <h4>${event.name}</h4>
                <div class="event-info">
                  <span>${event.ageRestriction}</span>
                  <span class="dot">•</span>
                  <span>${event.venueName}</span>
                </div>
              </div>
            </div>
    `;
  });
}
