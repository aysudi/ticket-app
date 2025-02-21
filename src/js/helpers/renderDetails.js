export function renderDetails(obj) {
  const detailsBox = document.querySelector("#details");
  detailsBox.innerHTML = "";
  detailsBox.innerHTML += `
    <div data-id=${obj.id} class="details__img">
          <img
            src="${obj.detailPoster}"
            alt=""
          />
        </div>
        <div class="details__info">
          <p class="date">Date Time: ${obj.dateTime}</p>
          <p class="price">Price: ${obj.price}$</p>
          <p class="duration">Duration: ${obj.duration}</p>
          <p class="age">Age Restriction: ${obj.ageRestriction}</p>
        </div>
        <div class="details__description">
          <iframe
            src="${obj.iframeURL}"
            width="600"
            height="500"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <p>
            ${obj.description}
          </p>
        </div>
        `;
  //   arr.forEach((el) => {});
}
