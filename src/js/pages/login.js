import Swal from "sweetalert2";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import { LocalItems } from "../classes/localItems.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginInputs = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
  };
  const form = document.querySelector(".sign__form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const validUser = apiResponse.data.find(
      (x) =>
        x.email == loginInputs.email.value &&
        x.password == loginInputs.password.value
    );

    if (validUser) {
      const userApp = new LocalItems("userID");
      const newUser = { id: validUser.id };
      userApp.add(newUser, "userID");
      Swal.fire({
        title: "Successfully logged!",
        icon: "success",
        draggable: true,
      });
      setTimeout(() => {
        window.location.href = "./user.html";
      }, 2000);
    } else {
      loginInputs.email.value = "";
      loginInputs.password.value = "";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password! Please try again.",
      });
    }
  });
});
