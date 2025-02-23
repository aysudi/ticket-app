import { LocalItems } from "../classes/localItems.js";
import { renderBasket } from "../helpers/renderBasket.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

let basketApp = new LocalItems("basket");
document.addEventListener("DOMContentLoaded", async () => {
  //   const basketInputs = {
  //     fullName: document.querySelector("#full-name"),
  //     email: document.querySelector("#email"),
  //     password: document.querySelector("password"),
  //   };

  const apiResponse = await controller.getAll(endpoints.events);
  const basketItems = JSON.parse(localStorage.getItem("basket"));
  let tickets = apiResponse.data.filter((x) =>
    basketItems.some((basket) => x.id == basket.id)
  );

  renderBasket(tickets);

  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");

  increaseButtons.forEach((increaseBtn) => {
    const id = increaseBtn.getAttribute("data-id");

    const validItem = basketApp.itemsArr.find(
      (basketItem) => basketItem.id == id
    );
    const validPrice = apiResponse.data.find((x) => x.id == id);
    increaseBtn.previousElementSibling.textContent = validItem.quantity;

    increaseBtn.addEventListener("click", function () {
      basketApp.increaseBasketItemQuantity(id, "basket");
      this.previousElementSibling.textContent = validItem.quantity;
      this.parentElement.nextElementSibling.textContent = `${
        validPrice.price * validItem.quantity
      }$`;
    });

    increaseBtn.parentElement.nextElementSibling.textContent = `${
      validPrice.price * validItem.quantity
    }$`;
  });

  decreaseButtons.forEach((decreaseBtn) => {
    const id = decreaseBtn.getAttribute("data-id");

    const validItem = basketApp.itemsArr.find(
      (basketItem) => basketItem.id == id
    );
    const validPrice = apiResponse.data.find((x) => x.id == id);
    decreaseBtn.nextElementSibling.textContent = validItem.quantity;

    decreaseBtn.addEventListener("click", function () {
      basketApp.decreaseBasketItemQuantity(id, "basket");
      this.nextElementSibling.textContent = validItem.quantity;
      this.parentElement.nextElementSibling.textContent = `${
        validPrice.price * validItem.quantity
      }$`;
    });

    decreaseBtn.parentElement.nextElementSibling.textContent = `${
      validPrice.price * validItem.quantity
    }$`;
  });
});
