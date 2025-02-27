export function renderAdminTickets(arr) {
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
                  <div class="price__box admin__price-box">
                    <div class="quantity__box">
                      <span data-id='${ticket.id}' class="quantity">x5</span>
                    </div>
                    <span class="price">${ticket.price}$</span>
                </div>
      `;
  });
}
