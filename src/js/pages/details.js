import { renderDetails } from "../helpers/renderDetails.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import { FavoriteItems } from "../classes/favoriteItems.js";

let favApp = undefined;
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const detailID = urlParams.get("id");
  const apiResponse = await controller.getAll(endpoints.events);
  const validEvent = apiResponse.data.find((x) => x.id == detailID);
  renderDetails(validEvent);

  const favBtn = document.querySelector(".favBtn");
  const newItem = { id: favBtn.getAttribute("data-id") };

  favBtn.addEventListener("click", (e) => {
    favApp = new FavoriteItems();
    favApp.add(newItem);
    e.target.style.border = "3px solid #fedd03";
    e.target.style.color = "#fedd03";
  });
  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
  const validItem = favItems.find((x) => x.id == newItem.id);
  if (validItem) {
    favBtn.style.border = "3px solid #fedd03";
    favBtn.style.color = "#fedd03";
  }
});
