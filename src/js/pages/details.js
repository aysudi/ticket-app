import { renderDetails } from "../helpers/renderDetails.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import { LocalItems } from "../classes/localItems.js";
import Swal from "sweetalert2";

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

  const user = JSON.parse(localStorage.getItem("userID"));

  basketBtn.addEventListener("click", () => {
    if (user) {
      basketApp.add(newBasketItem, "basket");
      Swal.fire({
        title: "Added to basket!",
        icon: "success",
        draggable: true,
      });
    } else {
      window.location.href = "./signIn.html";
    }
  });

  favBtn.addEventListener("click", (e) => {
    if (user) {
      Swal.fire({
        title: "Added to favorites!",
        icon: "success",
        draggable: true,
      });
      favApp.add(newFavoriteItem, "favorites");
      e.target.style.border = "3px solid #fedd03";
      e.target.style.color = "#fedd03";
    } else {
      window.location.href = "./signIn.html";
    }
  });
  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
  const validItem = favItems.find((x) => x.id == newFavoriteItem.id);
  if (validItem) {
    favBtn.style.border = "3px solid #fedd03";
    favBtn.style.color = "#fedd03";
  }
});
