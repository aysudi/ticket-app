import Swal from "sweetalert2";
import controller from "../services/request.js";
import { User } from "../classes/User.js";
import { endpoints } from "../services/api.js";
import { validatePassword } from "../helpers/validatePassword.js";

document.addEventListener("DOMContentLoaded", async () => {
  const registerInputs = {
    fullName: document.querySelector("#full-name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirm-password"),
  };
  const form = document.querySelector(".sign__form");

  const eyeIcons = document.querySelectorAll(".password-icon");

  let inputType = registerInputs.password.getAttribute("type");

  eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      if (inputType == "password") {
        inputType = "text";
        eyeIcon.previousElementSibling.setAttribute("type", "text");
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
      } else {
        inputType = "password";
        eyeIcon.previousElementSibling.setAttribute("type", "password");
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    });
  });

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
  console.log(await controller.getAll(endpoints.users));
});
