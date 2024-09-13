import Popup from "./Popup.js";
import PopupConfirmation from "./PopupConfirmation.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit, confirmModal}) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleForm = handleFormSubmit;
        this._confirmModal = confirmModal;
    }

    setEventListeners () {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._confirmModal.open(() => {
          this._handleForm(e, this._getInputValues());
        })
        this.close();
      });
    }

    _getInputValues() {
      const inputs = this._popupForm.getElementsByClassName("modal__input");
      const vals = {};
      Array.from(inputs).forEach(input => {
          vals[input.name] = input.value;
      });
      return vals;
  }
}
