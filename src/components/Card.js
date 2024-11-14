import Api from "../components/API.js";

const api = new Api(
  "b73a4638-eb7a-419c-8b34-f34f4d770b05",
  "https://around-api.en.tripleten-services.com/v1/cards"
);

export default class Card {
  constructor(cardObject, cardSelector, handleImageClick, confirmModal) {
    this.name = cardObject.name;
    this.link = cardObject.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = cardObject.id;
    this._isLiked = cardObject.isLiked;
    this._confirmModal = confirmModal;
  }

  getTemplate() {
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
      this._confirmModal.open(() => {
        this._handleDeleteCard();
      });
      // this._handleDeleteCard();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  onRender() {
    if (this._isLiked) {
      this._likeButton.classList.toggle("card__like-button_is-active");
    }
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      api.dislikeCard(this._id);
    } else {
      api.likeCard(this._id);
    }
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    api.deleteCard(this._id).then((res) => {
      //console.log(res);
    });
    this._cardElement.remove();
    this._cardElement = null;
  }

  getID() {
    return this._id;
  }

  getView() {
    this._cardElement = this.getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardImageElement.src = this.link;
    this._cardTitleElement.textContent = this.name;
    this._cardImageElement.alt = this.name;

    this._setEventListeners();
    return this._cardElement;
  }
}
