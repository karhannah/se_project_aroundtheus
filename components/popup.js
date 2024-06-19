export default class Popup {
    constructor({popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
    }
    open() {

    }

    close() {

    }

    _handleEscClose() {

    }

    setEventListeners() {

    }

}

// export function openPopup(modal) {
//     modal.classList.add("modal_opened");
//     document.addEventListener("keydown", closeModalEscape);
//     modal.addEventListener("mousedown", closeModalOverlay);
//   }
  
//   export function closePopup(modal) {
//     modal.classList.remove("modal_opened");
//     document.removeEventListener("keydown", closeModalEscape);
//     modal.removeEventListener("mousedown", closeModalOverlay);
//   }
  
//   export function closeModalEscape(event) {
//     if (event.key === "Escape") {
//       const openModal = document.querySelector(".modal_opened");
//       if (openModal) {
//         closePopup(openModal);
//       }
//     }
//   }
  
//   export function closeModalOverlay(event) {
//     if (event.target === event.currentTarget) {
//       closePopup(event.currentTarget);
//     }
//   }