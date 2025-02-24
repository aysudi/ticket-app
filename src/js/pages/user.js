import { User } from "../classes/User.js";
import { validatePassword } from "../helpers/validatePassword.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  const userInputs = {
    fullName: document.querySelector("#full-name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    balance: document.querySelector("#balance"),
    currentPassword: document.querySelector("#current-password"),
    newPassword: document.querySelector("#new-password"),
  };

  const checkValidUser = JSON.parse(localStorage.getItem("userID"));
  const apiResponse = await controller.getAll(endpoints.users);
  const userData = apiResponse.data.find((x) => x.id == checkValidUser[0].id);
  if (checkValidUser) {
    userInputs.fullName.value = userData.fullName;
    userInputs.username.value = userData.username;
    userInputs.email.value = userData.email;
    userInputs.balance.value = userData.balance;
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (userInputs.currentPassword.value == userData.password) {
      if (validatePassword(userInputs.newPassword.value)) {
        Swal.fire({
          title: "Profile updated!",
          icon: "success",
          draggable: true,
        });
        const updatedUser = new User(
          userInputs.fullName.value,
          userInputs.username.value,
          userInputs.email.value,
          userInputs.newPassword.value,
          userInputs.balance.value
        );
        await controller.updateOne(
          endpoints.users,
          updatedUser,
          checkValidUser[0].id
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password should have min 6 symbols!!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password!",
      });
    }
  });
});
