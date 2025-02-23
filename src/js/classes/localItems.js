export class LocalItems {
  constructor(el) {
    this.el = el;
    if (!JSON.parse(localStorage.getItem(el))) {
      this.itemsArr = [];
      localStorage.setItem(el, JSON.stringify([]));
    } else {
      const localFavorites = JSON.parse(localStorage.getItem(el));
      this.itemsArr = [...localFavorites];
    }
  }

  add(newItem, el) {
    const found = this.itemsArr.find((x) => x.id == newItem.id);
    if (!found) {
      this.itemsArr.push(newItem);
    }
    localStorage.setItem(el, JSON.stringify([...this.itemsArr]));
  }
}
