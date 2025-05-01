import { renderFavorites } from "../helpers/renderFavorites.js";
import { searchItems, sortItems } from "../helpers/sortSearch.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);
  const favoriteItems = JSON.parse(localStorage.getItem("favorites"));
  const favoritesList = apiResponse.data.filter((x) =>
    favoriteItems.some((el) => el.id == x.id)
  );
  renderFavorites(favoritesList);
  searchItems(favoritesList, renderFavorites);

  const favCard = document.querySelectorAll(".card");

  favCard.forEach((fav) => {
    console.log(fav);
    fav.addEventListener("click", () => {
      const id = fav.getAttribute("data-id");
      const url = new URL("http://localhost:5173/details.html");
      url.searchParams.set("id", id);
      window.location.href = url.toString();
    });
  });

  const sort = document.querySelector("#sort");
  sort.addEventListener("change", (e) => {
    const sortedList = sortItems(e.target.value, favoritesList);
    renderFavorites(sortedList);
  });
});
