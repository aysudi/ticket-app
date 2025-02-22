import { renderFavorites } from "../helpers/renderFavorites.js";
import { endpoints } from "../services/api";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);
  const favoriteItems = JSON.parse(localStorage.getItem("favorites"));
  const favoritesList = apiResponse.data.filter((x) =>
    favoriteItems.some((el) => el.id == x.id)
  );
  renderFavorites(favoritesList);
});
