export class LocalItems {
  constructor(el) {
    this.el = el;
    if (!JSON.parse(localStorage.getItem(el))) {
      this.itemsArr = [];
      localStorage.setItem(el, JSON.stringify([]));
    } else {
      const localItems = JSON.parse(localStorage.getItem(el));
      this.itemsArr = [...localItems];
    }
  }

  add(newItem, el) {
    const found = this.itemsArr.find((x) => x.id == newItem.id);
    if (!found) {
      this.itemsArr.push(newItem);
    }
    localStorage.setItem(el, JSON.stringify([...this.itemsArr]));
  }

  removeBasketItem(id, el) {
    this.itemsArr = this.itemsArr.filter((item) => item.id != id);
    localStorage.setItem(el, JSON.stringify([...this.itemsArr]));
  }

  decreaseBasketItemQuantity(id, el) {
    const found = this.itemsArr.find((x) => x.id == id);
    if (found) {
      if (found.quantity == 1) {
        this.itemsArr.removeBasketItem(id, el);
      } else {
        found.quantity--;
      }
    }
    localStorage.setItem(el, JSON.stringify([...this.itemsArr]));
  }

  increaseBasketItemQuantity(id, el) {
    const found = this.itemsArr.find((x) => x.id == id);
    if (found) {
      found.quantity++;
    }
    localStorage.setItem(el, JSON.stringify([...this.itemsArr]));
  }
}
