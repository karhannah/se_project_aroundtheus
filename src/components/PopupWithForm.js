import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleForm = handleFormSubmit;
    }

    setEventListeners () {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleForm(e, this._getInputValues());
      });
    }

    _getInputValues() {
      const inputs = this._popupForm.getElementsByClassName("modal__input");
      const vals = new Array;
      Array.from(inputs).forEach(input => {
          vals.push(input.value);
      });
      return vals;
  }
}
