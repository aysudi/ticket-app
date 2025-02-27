export function renderAdminEvents(arr) {
  const tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  arr.forEach((event) => {
    tBody.innerHTML += `
    <tr>
                <td class="py-4 px-6 border-b border-gray-200">
                  <div class="name-box flex gap-4 items-center">
                    <div class="img-box flex-shrink-0 h-10 w-10">
                      <img
                        src="${event.posterURL}"
                        alt=""
                      />
                    </div>
                    <div class="text__box">
                      <div>${event.name}</div>
                      <div class="text-gray-500">${event.category}</div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  ${event.dateTime}
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  ${event.duration}
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  ${event.price}$
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  <div class="icons-box flex gap-10 align-center">
                    <i class="edit fa-solid fa-pen-to-square"></i>
                    <i class="delete fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>
    `;
  });
}
