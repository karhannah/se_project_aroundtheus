import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(confirmAction) {
    super.open();
    this._popupElement.querySelector(".modal__form")
                      .addEventListener("submit", (e) => { e.preventDefault();
                                                           confirmAction();
                                                           this.close(); });
  }
}
