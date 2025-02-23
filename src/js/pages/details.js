import { renderDetails } from "../helpers/renderDetails.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import { LocalItems } from "../classes/localItems.js";

let favApp = undefined;
let basketApp = undefined;
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const detailID = urlParams.get("id");
  const apiResponse = await controller.getAll(endpoints.events);
  const validEvent = apiResponse.data.find((x) => x.id == detailID);
  renderDetails(validEvent);

  const favBtn = document.querySelector(".fav-btn");
  const basketBtn = document.querySelector(".basket-btn");
  const newFavoriteItem = { id: favBtn.getAttribute("data-id") };
  const newBasketItem = { id: favBtn.getAttribute("data-id"), quantity: 1 };
  favApp = new LocalItems("favorites");
  basketApp = new LocalItems("basket");

  basketBtn.addEventListener("click", () => {
    basketApp.add(newBasketItem, "basket");
  });

  favBtn.addEventListener("click", (e) => {
    favApp.add(newFavoriteItem, "favorites");
    e.target.style.border = "3px solid #fedd03";
    e.target.style.color = "#fedd03";
  });
  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
  const validItem = favItems.find((x) => x.id == newFavoriteItem.id);
  if (validItem) {
    favBtn.style.border = "3px solid #fedd03";
    favBtn.style.color = "#fedd03";
  }
});
