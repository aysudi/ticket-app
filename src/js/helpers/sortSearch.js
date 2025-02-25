import { renderFavorites } from "./renderFavorites.js";

export function sortItems(option, arr) {
  switch (option) {
    case "Price: High to Low":
      return [...arr].sort((x, y) => y.price - x.price);
      break;
    case "Price: Low to High":
      return [...arr].sort((x, y) => x.price - y.price);
      break;
    default:
      return arr;
  }
}

export function searchItems(arr, func) {
  const searchInp = document.querySelector("#search");
  searchInp.addEventListener("keyup", (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    const searchedValue = arr.filter((x) =>
      x.name.trim().toLowerCase().includes(searchQuery)
    );
    func(searchedValue);
  });
}
