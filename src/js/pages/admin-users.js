import { User } from "../classes/User.js";
import { renderUsers } from "../helpers/renderUsers.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.users);
  renderUsers(apiResponse.data);

  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");
  const modal = document.querySelector(".modal");

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async function () {
      const userId = this.getAttribute("data-id");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await controller.deleteOne(endpoints.users, userId);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          this.parentElement.parentElement.remove();
        }
      });
    });
  });

  editButtons.forEach((editBtn) => {
    editBtn.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");

      modal.style.display = "flex";

      const userInputs = {
        fullName: document.querySelector("#full-name"),
        username: document.querySelector("#username"),
        email: document.querySelector("#email"),
        balance: document.querySelector("#balance"),
        role: document.querySelector("#role"),
      };
      const updateBtn = document.querySelector(".update-btn");
      const cancelBtn = document.querySelector(".cancel-btn");

      const validUser = apiResponse.data.find((x) => x.id == userId);

      userInputs.fullName.value = validUser.fullName;
      userInputs.username.value = validUser.username;
      userInputs.email.value = validUser.email;
      userInputs.balance.value = validUser.balance;
      userInputs.role.value = validUser.role;

      updateBtn.addEventListener("click", async () => {
        const updatedUser = new User(
          userInputs.fullName.value,
          userInputs.username.value,
          userInputs.email.value,
          validUser.password,
          userInputs.balance.value,
          userInputs.role.value
        );

        await controller.updateOne(endpoints.users, updatedUser, userId);

        await Swal.fire({
          title: "Profile updated!",
          icon: "success",
          draggable: true,
        });

        window.location.reload();

        modal.style.display = "none";
        overlay.classList.add("hidden");
      });

      cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  });
});
