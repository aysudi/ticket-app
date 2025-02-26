import { User } from "../classes/User.js";
import { validatePassword } from "../helpers/validatePassword.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  const adminInputs = {
    fullName: document.querySelector("#full-name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    balance: document.querySelector("#balance"),
    currentPassword: document.querySelector("#current-password"),
    newPassword: document.querySelector("#new-password"),
  };

  const userID = JSON.parse(localStorage.getItem("userID"));
  const apiResponse = await controller.getAll(endpoints.users);
  const validUser = apiResponse.data.find((x) => x.id == userID[0].id);

  if (validUser) {
    adminInputs.fullName.value = validUser.fullName;
    adminInputs.username.value = validUser.email;
    adminInputs.email.value = validUser.email;
    adminInputs.balance.value = validUser.balance;
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedAdmin = new User(
      adminInputs.fullName.value,
      adminInputs.username.value,
      adminInputs.email.value,
      adminInputs.newPassword.value,
      adminInputs.balance.value,
      "admin"
    );

    if (
      adminInputs.currentPassword.value == validUser.password &&
      adminInputs.newPassword.value != adminInputs.currentPassword.value
    ) {
      if (validatePassword(adminInputs.newPassword.value)) {
        await controller.updateOne(endpoints.users, updatedAdmin, userID[0].id);

        adminInputs.currentPassword.value = "";
        adminInputs.newPassword.value = "";

        Swal.fire({
          title: "Profile updated!",
          icon: "success",
          draggable: true,
        });
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
