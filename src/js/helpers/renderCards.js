export function renderCards(arr) {
  const eventsCards = document.querySelector(".events__cards");
  eventsCards.innerHTML = "";
  arr.forEach((event) => {
    eventsCards.innerHTML += `
        <div data-id=${event.id} class="card">
            <div class="event__img">
              <img
                src="${event.posterURL}"
                alt=""
              />
            </div>
            <div class="event__info">
              <h4>${event.name}</h4>
              <p>${event.dateTime}</p>
              <span>${event.venueName}</span>
            </div>
          </div>
        `;
  });
}
