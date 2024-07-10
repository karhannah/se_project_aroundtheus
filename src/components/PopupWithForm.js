import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleForm = handleFormSubmit;
        this.setEventListeners();
    }

    close() {
        super.close();
    }

    setEventListeners () {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", this._handleForm);
    }

    getInputs() {
      const inputs = this._popupForm.getElementsByClassName("modal__input");
      let vals = [];
      Array.from(inputs).forEach(input => {
          vals.push(input.value);
      });
      return vals;
  }
}
