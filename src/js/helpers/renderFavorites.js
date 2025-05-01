export function renderFavorites(arr) {
  const favoritesCards = document.querySelector(".favorites__cards");
  favoritesCards.innerHTML = "";
  arr.forEach((event) => {
    favoritesCards.innerHTML += `
        <div class="card" data-id=${event.id}>
            <div class="favorites__img">
              <img
                src="${event.posterURL}"
                alt=""
              />
              <span>${event.price}$</span>
            </div>
            <div class="favorites__info">
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
