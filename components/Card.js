export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardImageElement.src = this._link;
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
