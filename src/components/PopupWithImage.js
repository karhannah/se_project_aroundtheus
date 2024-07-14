import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(src, data) {
        this._popupElement.querySelector(".modal__image").src = src;
        this._popupElement.querySelector(".modal__image").alt = src;
        this._popupElement.querySelector(".modal__caption").textContent = data;
        super.open();
    }
}