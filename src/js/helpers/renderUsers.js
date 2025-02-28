export function renderUsers(arr) {
  const tbody = document.querySelector("#table__body");
  tbody.innerHTML = "";
  arr.forEach((user) => {
    tbody.innerHTML += `
    <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="img-box flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="${user.profilePictureURL}"
                      alt=""
                    />
                  </div>
                  <div class="text-box ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      ${user.fullName}
                    </div>
                    <div class="text-sm text-gray-500">
                      ${user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.role}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.accountCreationDate}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.balance}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.email}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a data-id=${user.id} class="delete ml-2 text-red-600 hover:text-red-900"
                  >Delete</a
                >
              </td>
            </tr>
    `;
  });
}

/* <a data-id=${user.id} class="edit text-indigo-600 hover:text-indigo-900"
>Edit</a
> */
