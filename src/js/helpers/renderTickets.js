export function renderTickets(arr) {
  const ticketsBox = document.querySelector(".tickets__box");
  ticketsBox.innerHTML = "";
  arr.forEach((ticket) => {
    ticketsBox.innerHTML += `
                <div class="ticket">
                  <img src="${ticket.posterURL}" alt="" />
                  <div class="text__box">
                    <span>${ticket.venueName}/${ticket.dateTime}</span>
                    <p>${ticket.name}</p>
                    <span>${ticket.category}</span>
                  </div>
                </div>
    `;
  });
}
