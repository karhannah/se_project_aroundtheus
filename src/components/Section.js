export default class Section {

constructor({items, renderer},classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
}

renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const newCard = this._renderer(item);
    this._container.prepend(newCard);
  }
}

