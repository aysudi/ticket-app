export function renderBasket(arr) {
  const ticketsCards = document.querySelector(".tickets__cards");
  ticketsCards.innerHTML = "";
  arr.forEach((ticket) => {
    ticketsCards.innerHTML += `
    <div class="card">
                <div class="event">
                  <div class="img__box">
                    <img src="${ticket.posterURL}" alt="" />
                  </div>
                  <div class="text__box">
                    <span>${ticket.venueName}/${ticket.dateTime}</span>
                    <p>${ticket.name}</p>
                    <span>${ticket.category}</span>
                  </div>
                </div>
                <div class="price__box">
                  <div class="quantity__box">
                    <div data-id="${ticket.id}" class="decrease">
                      <span>-</span>
                    </div>
                    <span class="quantity">1</span>
                    <div data-id="${ticket.id}" class="increase">
                      <span>+</span>
                    </div>
                  </div>
                  <span class="price">${ticket.price}$</span>
                  <i data-id="${ticket.id}" class="delete fa-solid fa-trash"></i>
                </div>
              </div>
    `;
  });
}
