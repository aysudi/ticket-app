export function adminEventsModal() {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";
  modal.innerHTML += `
  <div class="user__inputs">
            <input id="name" type="text" placeholder="Name" required />
            <input id="dateTime" type="text" placeholder="Date Time" required />
            <input
              id="venueName"
              type="text"
              placeholder="Venue Name"
              required
            />
            <input
              id="venueCapacity"
              type="number"
              placeholder="Venue Capacity"
              required
            />
            <input id="category" type="text" placeholder="Category" required />
            <input
              id="organizer"
              type="text"
              placeholder="Organizer"
              required
            />
            <input
              id="ticketsAvailable"
              type="number"
              placeholder="Tickets Available"
              required
            />
            <input id="price" type="number" placeholder="Price" required />
            <input
              id="ageRestriction"
              type="text"
              placeholder="Age Restriction"
              required
            />
            <input
              id="posterURL"
              type="text"
              placeholder="Poster URL"
              required
            />
            <input id="duration" type="text" placeholder="duration" required />
            <input
              id="detailPoster"
              type="text"
              placeholder="Details Poster"
              required
            />
            <input
              id="soldTickets"
              type="text"
              placeholder="Sold Tickets"
              required
            />
            <input
              id="description"
              type="text"
              placeholder="Description"
              required
            />
          </div>
          <div class="edit__buttons">
            <button type="button" class="update-btn btn">Update</button>
            <button type="button" class="cancel-btn btn">Cancel</button>
          </div>
  `;
}
