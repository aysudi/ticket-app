import { User } from "../classes/User.js";
import { renderUsers } from "../helpers/renderUsers.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.users);
  renderUsers(apiResponse.data);

  const userInputs = {
    fullName: document.querySelector("#full-name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    balance: document.querySelector("#balance"),
    role: document.querySelector("#role"),
    password: document.querySelector("#password"),
  };

  const deleteButtons = document.querySelectorAll(".delete");
  const addBtn = document.querySelector(".add__user");
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
            text: "User has been deleted.",
            icon: "success",
          });
          this.parentElement.parentElement.remove();
        }
      });
    });
  });

  //   editButtons.forEach((editBtn) => {
  //     editBtn.addEventListener("click", function () {
  //       const userId = this.getAttribute("data-id");

  //       modal.style.display = "flex";

  //       const validUser = apiResponse.data.find((x) => x.id == userId);

  //       userInputs.fullName.value = validUser.fullName;
  //       userInputs.username.value = validUser.username;
  //       userInputs.email.value = validUser.email;
  //       userInputs.balance.value = validUser.balance;
  //       userInputs.role.value = validUser.role;

  //       const updateBtn = document.querySelector(".update-btn");

  //       updateBtn.addEventListener("click", async () => {
  //         const updatedUser = new User(
  //           userInputs.fullName.value,
  //           userInputs.username.value,
  //           userInputs.email.value,
  //           userInputs.password.value,
  //           userInputs.balance.value,
  //           userInputs.role.value
  //         );

  //         await controller.updateOne(endpoints.users, updatedUser, userId);

  //         await Swal.fire({
  //           title: "Profile updated!",
  //           icon: "success",
  //           draggable: true,
  //         });

  //         window.location.reload();

  //         modal.style.display = "none";
  //       });
  //     });
  //   });

  const cancelBtn = document.querySelector(".cancel-btn");
  const overlay = document.querySelector(".overlay");

  addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    overlay.classList.remove("hidden");

    const updateBtn = document.querySelector(".update-btn");

    updateBtn.addEventListener("click", async () => {
      const newUser = new User(
        userInputs.fullName.value,
        userInputs.username.value,
        userInputs.email.value,
        userInputs.password.value,
        userInputs.balance.value,
        userInputs.role.value
      );

      await controller.post(endpoints.users, newUser);

      await Swal.fire({
        title: "Profile updated!",
        icon: "success",
        draggable: true,
      });

      window.location.reload();

      modal.style.display = "none";
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.classList.add("hidden");
  });
});

// {
//     "id": "14",
//     "name": "All Eyes On Me",
//     "dateTime": "May 5, 2025",
//     "venueName": "Baku Nightclub",
//     "venueAddress": "Hayal Kahvesi, Baku, Azerbaijan",
//     "venueCapacity": 2000,
//     "organizer": "Event Masters",
//     "description": "Get ready for an electrifying night at All Eyes On Me, the ultimate party experience at Baku Nightclub! This high-energy event will feature an unforgettable lineup of top-tier DJs, live performances, and a pulsating atmosphere that will keep you on your feet until the early hours. Immerse yourself in an explosion of lights, beats, and pure energy as some of the best artists in the industry bring you a night of non-stop music and entertainment. Whether you're a fan of house, hip-hop, EDM, or chart-topping hits, the carefully curated setlist will have something for everyone. Dance under dazzling visuals, enjoy premium drinks, and let the music take over. With a crowd of 2,000 partygoers, this is the place to be if you're looking for the hottest vibes in town. Don't miss out—secure your spot now and make this night one to remember!",
//     "ticketsAvailable": 800,
//     "category": "Party",
//     "price": 25,
//     "ageRestriction": "18+",
//     "posterURL": "https://cdn.iticket.az/event/poster_bg/c8iJ50lxbF2ba4QwLACK7Fx27JpTnxaT8krrN5Nu.jpg",
//     "duration": "6 hours",
//     "detailPoster": "https://cdn.iticket.az/event/cover/WA45wTMdDurhNxa4Hjof1zsGj2WxbfnTEsampkl3.jpg",
//     "soldTickets": 1200,
//     "iframeURL": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.7248679501863!2d49.84752447660794!3d40.370624558443325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d48cedf629f%3A0xd2b0761dfca5bb6c!2sHayal%20Kahvesi%20Baku!5e0!3m2!1sen!2saz!4v1740155583915!5m2!1sen!2saz"
//   }
