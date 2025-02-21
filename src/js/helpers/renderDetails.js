export function renderDetails(obj) {
  const detailsBox = document.querySelector("#details");
  detailsBox.innerHTML = "";
  detailsBox.innerHTML += `
  <div data-id="${obj.id}" class="details__img">
          <img src="${obj.detailPoster}" alt="" />
        </div>
        <div class="details__info">
          <div class="date">
            <p>Date Time: ${obj.dateTime}</p>
          </div>
          <div class="price">
            <p>Price: ${obj.price}$</p>
          </div>
          <div class="duration">
            <p>Duration: ${obj.duration}</p>
          </div>
          <div class="age">
            <p>Age Restriction: ${obj.ageRestriction}</p>
          </div>
        </div>
        <div class="details__description">
          <iframe
            src="${obj.iframeURL}"
            width="600"
            height="530"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <p>${obj.description}</p>
        </div>
  `;
}
