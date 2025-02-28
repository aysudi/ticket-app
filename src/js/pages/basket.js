import { LocalItems } from "../classes/localItems.js";
import { generateRandomCode } from "../helpers/generateCode.js";
import { renderBasket } from "../helpers/renderBasket.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

let basketApp = new LocalItems("basket");
document.addEventListener("DOMContentLoaded", async () => {
  const basketInputs = {
    fullName: document.querySelector("#full-name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
  };
  const form = document.querySelector("form");

  const apiResponse = await controller.getAll(endpoints.events);
  const basketItems = JSON.parse(localStorage.getItem("basket"));
  let tickets = apiResponse.data.filter((x) =>
    basketItems.some((basket) => x.id == basket.id)
  );

  renderBasket(tickets);

  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");
  const deleteButtons = document.querySelectorAll(".delete");
  const subTotal = document.querySelector(".subtotal");
  const prices = document.querySelectorAll(".price");
  let totalPrice = 0;

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
      totalPrice += validPrice.price;
      subTotal.textContent = totalPrice;
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
      totalPrice -= validPrice.price;
      subTotal.textContent = totalPrice;
    });

    decreaseBtn.parentElement.nextElementSibling.textContent = `${
      validPrice.price * validItem.quantity
    }$`;
  });

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your ticket has been deleted.",
            icon: "success",
          });
          const id = this.getAttribute("data-id");

          const validItem = basketApp.itemsArr.find((x) => x.id == id);
          const validPrice = apiResponse.data.find((x) => x.id == id);

          if (validItem && validPrice) {
            totalPrice -= validPrice.price * validItem.quantity;
            subTotal.textContent = totalPrice;
          }

          this.parentElement.parentElement.remove();
          basketApp.removeBasketItem(id, "basket");
        }
      });
    });
  });

  prices.forEach(
    (price) => (totalPrice += Number(price.textContent.split("$")[0]))
  );
  subTotal.textContent = totalPrice;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userResponse = await controller.getAll(endpoints.users);
    const user = JSON.parse(localStorage.getItem("userID"));
    const checkValidUser = userResponse.data.find((x) => x.id == user[0].id);

    if (
      basketInputs.fullName.value == checkValidUser.fullName &&
      basketInputs.email.value == checkValidUser.email &&
      basketInputs.password.value == checkValidUser.password
    ) {
      if (checkValidUser.balance > totalPrice) {
        const updatedTickets = JSON.parse(localStorage.getItem("basket"));

        for (const ticket of updatedTickets) {
          const ticketData = {
            userId: user[0].id,
            eventId: ticket.id,
            quantity: ticket.quantity,
            price: ticket.price,
            purchaseDate: new Date().toISOString(),
            ticketCode: generateRandomCode(),
          };

          const validEvent = tickets.filter((x) => x.id == ticket.id);
          const decreasedAvailableTickets =
            validEvent[0].ticketsAvailable - ticket.quantity;

          await controller.post(endpoints.tickets, ticketData);
          await controller.updateOne(
            endpoints.events,
            { ticketsAvailable: decreasedAvailableTickets },
            ticket.id
          );

          const ticketsCards = document.querySelector(".tickets__cards");
          ticketsCards.innerHTML = "";
          basketInputs.fullName.value = "";
          basketInputs.email.value = "";
          basketInputs.password.value = "";
          localStorage.removeItem("basket");

          Swal.fire({
            title: "Successfully ordered!",
            icon: "success",
            draggable: true,
          });

          let spentMoney = Number(checkValidUser.totalSpentMoney);
          spentMoney += totalPrice;

          let balance = Number(checkValidUser.balance);
          balance -= totalPrice;

          await controller.updateOne(
            endpoints.users,
            {
              balance: balance,
              totalSpentMoney: spentMoney,
            },
            user[0].id
          );

          subTotal.textContent = 0;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You don't have enough balance!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid user information!",
      });
    }
  });
});
