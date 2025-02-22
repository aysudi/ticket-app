export class FavoriteItems {
  constructor() {
    if (!JSON.parse(localStorage.getItem("favorites"))) {
      this.favoriteItems = [];
      localStorage.setItem("favorites", JSON.stringify([]));
    } else {
      const localFavorites = JSON.parse(localStorage.getItem("favorites"));
      this.favoriteItems = [...localFavorites];
    }
  }

  add(newItem) {
    const found = this.favoriteItems.find((x) => x.id == newItem.id);
    if (!found) {
      this.favoriteItems.push(newItem);
    }
    localStorage.setItem("favorites", JSON.stringify([...this.favoriteItems]));
  }
}
