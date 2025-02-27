import { renderAdminTickets } from "../helpers/renderAdminTickets.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);
  renderAdminTickets(apiResponse.data);

  const ticketsApi = await controller.getAll(endpoints.tickets);

  const quantity = Array.from(document.querySelectorAll(".quantity"));

  for (let i = 0; i < apiResponse.data.length; i++) {
    let sum = 0;

    for (let j = 0; j < ticketsApi.data.length; j++) {
      if (ticketsApi.data[j].eventId == quantity[i].getAttribute("data-id")) {
        sum += ticketsApi.data[j].quantity;
      }
    }

    quantity[i].textContent = `x${sum}`;
  }
});
