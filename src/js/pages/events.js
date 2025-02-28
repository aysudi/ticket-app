import { renderCards } from "../helpers/renderCards.js";
import { searchItems, sortItems } from "../helpers/sortSearch.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);

  renderCards(apiResponse.data);
  searchItems(apiResponse.data, renderCards);

  const sort = document.querySelector("#sort");
  sort.addEventListener("change", (e) => {
    const sortedList = sortItems(e.target.value, apiResponse.data);
    renderCards(sortedList);
  });

  const eventsCards = document.querySelectorAll(".card");
  console.log(eventsCards);
  eventsCards.forEach((event) => {
    event.addEventListener("click", () => {
      console.log("hello");
      const url = new URL(window.location.href);
      const eventID = event.getAttribute("data-id");
      url.searchParams.set("id", eventID);
      window.location.href = `./details.html?id=${eventID}`;
    });
  });
});
