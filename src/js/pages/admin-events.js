import { adminEventsModal } from "../helpers/adminEventsModal.js";
import { renderAdminEvents } from "../helpers/renderAdminEvents.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);
  renderAdminEvents(apiResponse.data);

  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");
  const addBtn = document.querySelector(".add__user");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");

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
          await controller.deleteOne(endpoints.events, id);
          this.parentElement.parentElement.parentElement.remove();
          Swal.fire({
            title: "Deleted!",
            text: "Event has been deleted.",
            icon: "success",
          });
        }
      });
    });
  });

  addBtn.addEventListener("click", () => {
    adminEventsModal();
    modal.style.display = "flex";
    overlay.classList.remove("hidden");

    const eventInputs = {
      name: document.querySelector("#name"),
      dateTime: document.querySelector("#dateTime"),
      venueName: document.querySelector("#venueName"),
      venueCapacity: document.querySelector("#venueCapacity"),
      category: document.querySelector("#category"),
      organizer: document.querySelector("#organizer"),
      ticketsAvailable: document.querySelector("#ticketsAvailable"),
      price: document.querySelector("#price"),
      ageRestriction: document.querySelector("#ageRestriction"),
      posterURL: document.querySelector("#posterURL"),
      duration: document.querySelector("#duration"),
      detailPoster: document.querySelector("#detailPoster"),
      soldTickets: document.querySelector("#soldTickets"),
      description: document.querySelector("#description"),
    };

    const updateBtn = document.querySelector(".update-btn");

    updateBtn.addEventListener("click", async () => {
      const addedEvent = {
        name: eventInputs.name.value,
        dateTime: eventInputs.dateTime.value,
        vanueName: eventInputs.venueName.value,
        venueCapacity: eventInputs.venueCapacity.value,
        description: eventInputs.description.value,
        ticketsAvailable: eventInputs.ticketsAvailable.value,
        category: eventInputs.category.value,
        price: eventInputs.price.value,
        ageRestriction: eventInputs.ageRestriction.value,
        posterURL: eventInputs.posterURL.value,
        duration: eventInputs.duration.value,
        detailPoster: eventInputs.detailPoster.value,
        soldTickets: eventInputs.soldTickets.value,
      };

      await controller.post(endpoints.events, addedEvent);

      await Swal.fire({
        title: "Profile updated!",
        icon: "success",
        draggable: true,
      });

      window.location.reload();

      modal.style.display = "none";
      overlay.classList.add("hidden");
    });

    const cancelBtn = document.querySelector(".cancel-btn");

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.classList.add("hidden");
    });
  });

  editButtons.forEach((editBtn) => {
    editBtn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      const validEvent = apiResponse.data.find((x) => x.id == id);

      if (validEvent) {
        adminEventsModal();
        modal.style.display = "grid";
        overlay.classList.remove("hidden");

        const eventInputs = {
          name: document.querySelector("#name"),
          dateTime: document.querySelector("#dateTime"),
          venueName: document.querySelector("#venueName"),
          venueCapacity: document.querySelector("#venueCapacity"),
          category: document.querySelector("#category"),
          organizer: document.querySelector("#organizer"),
          ticketsAvailable: document.querySelector("#ticketsAvailable"),
          price: document.querySelector("#price"),
          ageRestriction: document.querySelector("#ageRestriction"),
          posterURL: document.querySelector("#posterURL"),
          duration: document.querySelector("#duration"),
          detailPoster: document.querySelector("#detailPoster"),
          soldTickets: document.querySelector("#soldTickets"),
          description: document.querySelector("#description"),
        };

        eventInputs.name.value = validEvent.name;
        eventInputs.dateTime.value = validEvent.dateTime;
        eventInputs.venueName.value = validEvent.venueName;
        eventInputs.venueCapacity.value = validEvent.venueCapacity;
        eventInputs.category.value = validEvent.category;
        eventInputs.organizer.value = validEvent.organizer;
        eventInputs.ticketsAvailable.value = validEvent.ticketsAvailable;
        eventInputs.price.value = validEvent.price;
        eventInputs.ageRestriction.value = validEvent.ageRestriction;
        eventInputs.posterURL.value = validEvent.posterURL;
        eventInputs.duration.value = validEvent.duration;
        eventInputs.detailPoster.value = validEvent.detailPoster;
        eventInputs.soldTickets.value = validEvent.soldTickets;
        eventInputs.description.value = validEvent.description;

        const cancelBtn = document.querySelector(".cancel-btn");
        cancelBtn.addEventListener("click", () => {
          modal.style.display = "none";
          overlay.classList.add("hidden");
        });

        const updateBtn = document.querySelector(".update-btn");
        updateBtn.addEventListener("click", async () => {
          const editedEvent = {
            name: eventInputs.name.value,
            dateTime: eventInputs.dateTime.value,
            vanueName: eventInputs.venueName.value,
            venueCapacity: eventInputs.venueCapacity.value,
            description: eventInputs.description.value,
            ticketsAvailable: eventInputs.ticketsAvailable.value,
            category: eventInputs.category.value,
            price: eventInputs.price.value,
            ageRestriction: eventInputs.ageRestriction.value,
            posterURL: eventInputs.posterURL.value,
            duration: eventInputs.duration.value,
            detailPoster: eventInputs.detailPoster.value,
            soldTickets: eventInputs.soldTickets.value,
          };

          await controller.updateOne(endpoints.events, editedEvent, id);

          await Swal.fire({
            title: "Updated!",
            text: "Event has been updated.",
            icon: "success",
          });

          modal.style.display = "none";
          overlay.classList.add("hidden");

          window.location.reload();
        });
      }
    });
  });
});
