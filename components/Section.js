export default class Section {

constructor({items, renderer},classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
    console.log(classSelector);
    console.log(this._container);
}

renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
  
  addItem(item) {
    const newCard = this._renderer(item);
    console.log(this._container);
    this._container.prepend(newCard);
  }
}

  