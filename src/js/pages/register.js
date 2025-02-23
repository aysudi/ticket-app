import Swal from "sweetalert2";
import controller from "../services/request.js";
import { User } from "../classes/User.js";
import { endpoints } from "../services/api";

document.addEventListener("DOMContentLoaded", () => {
  const registerInputs = {
    fullName: document.querySelector("#full-name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirm-password"),
  };
  const form = document.querySelector(".sign__form");

  function validatePassword(password) {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]{6,}$/;
    return regex.test(password);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (validatePassword(registerInputs.password.value)) {
      if (
        registerInputs.password.value == registerInputs.confirmPassword.value
      ) {
        const newUser = new User(
          registerInputs.fullName.value,
          registerInputs.username.value,
          registerInputs.email.value,
          registerInputs.password.value
        );
        const apiResponse = await controller.post(endpoints.users, newUser);
        Swal.fire({
          title: "Successfully registered!",
          icon: "success",
          draggable: true,
        });
        setTimeout(() => {
          window.location.href = "./signIn.html";
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords don't match!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should have min 6 symbols!",
      });
    }
  });
});
