import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleForm = handleFormSubmit;
        this.setEventListeners();
    }

    close() {
        this._popupForm.reset()
        super.close();
    }

    setEventListeners () {
        super.setEventListeners()
        this._popupForm.addEventListener("submit", this._handleForm);
    }

    _handleProfileEditSubmit(e) {
        e.preventDefault();
    }
}

// const newCardPopup = new PopupWithForm("#cardModal", () => {});
// newCardPopup.open()

// newCardPopup.close();
