export function renderTickets(arr) {
  const ticketsBox = document.querySelector(".tickets__history");
  ticketsBox.innerHTML = "";
  arr.forEach((ticket) => {
    ticketsBox.innerHTML += `
                <div class="ticket">
            <div class="info__box">
              <img
                src=${ticket.posterURL}
                alt=""
              />
              <div class="text__box">
                <span>${ticket.venueName}/${ticket.dateTime}</span>
                <p>${ticket.name}</p>
                <span>${ticket.category}</span>
              </div>
            </div>
            <div class="price__box">
              <span class="price">${ticket.price}$</span>
            </div>
          </div>
    `;
  });
}
