export default class Section {

constructor({renderer},classSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  addItem(item) {
    const card = this._renderer(item);
    const newCard = card.view;
    this._container.prepend(newCard);
    card.card.onRender();

  }
}

