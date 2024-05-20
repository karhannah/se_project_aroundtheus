class Card {
  constructor(data, cardSelector, handleImageClick) {
    // assign each of the parameters to `this` as private fields
    // ...
    this._handeImageClick = handleImageClick;
  }

  _setEventListeners() {
    // ...
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
}
