import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = this._popupElement.querySelector(".modal__container");
        this.setEventListeners();
    }


    //const cardTitleInput = cardAddModal.modal.querySelector("#modal__new-title");
//const cardImageInput = cardAddModal.modal.querySelector("#modal__new-description");
    open(src, data) {
        this._popupElement.querySelector(".modal__image").src = src;
        this._popupElement.querySelector(".modal__caption").innerHTML = data;
        super.open();
    }

    setEventListeners () {
    }
}