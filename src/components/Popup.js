export default class Popup {
  constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleModalClose = this._handleModalClose.bind(this);
      this._popupElement.querySelector(".modal__close").addEventListener("click", () => this.close());
  }

  open() {
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
      this._popupElement.addEventListener("mousedown", this._handleModalClose);
  }

  close() {
      this._popupElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
      this._popupElement.removeEventListener("mousedown", this._handleModalClose);
  }

  _handleEscClose(event) {
      if (event.key === "Escape") {
          this.close();
      }
  }

  _handleModalClose(event) {
      if (event.target === event.currentTarget) {
          this.close();
      }
  }

  setEventListeners() {
  }
}
