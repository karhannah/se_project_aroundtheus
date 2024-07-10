import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.setEventListeners();
    }


    //const cardTitleInput = cardAddModal.modal.querySelector("#modal__new-title");
//const cardImageInput = cardAddModal.modal.querySelector("#modal__new-description");
    open(src, data) {
        this._popupElement.querySelector(".modal__image").src = src;
        this._popupElement.querySelector(".modal__image").alt = src;
        this._popupElement.querySelector(".modal__caption").textContent = data;
        super.open();
    }
}