export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        console.log (this._popupElement);
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
            
            if (this._popupElement) {
            this.close();
            }
        }
    }

    _handleModalClose(event) {
        if (event.target === event.currentTarget) {
             this.close();
            }
    }

    get modal() {
        return this._popupElement;
    }

//     setEventListeners() {

//     }

}