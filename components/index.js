import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../src/pages/index.css";
import Popup from "./popup.js";
import Section from "./Section.js";

// Initial cards data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const section = new Section ({items:initialCards, renderer: addCard}, ".gallery__cards");
section.renderItems();

// Elements
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardListEl = document.querySelector(".gallery__cards");
const addNewCardButton = document.querySelector("#profile__add-button");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#modal__title");
const profileDescriptionInput = document.querySelector("#modal__description");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profileEditModal");
const profileEditModalClose = document.querySelector(
  "#profile__edit-modal-close"
);
const profileModalForm = document.querySelector("#profile-form");
const profileFormModal = new Popup("#profileEditModal");
const cardAddModal = new Popup("#cardModal");
const cardModalClose = document.querySelector("#profile__add-modal-close");
const cardForm = document.querySelector("#add-form");
const cardTitleInput = cardAddModal.modal.querySelector("#modal__new-title");
const cardImageInput = cardAddModal.modal.querySelector("#modal__new-description");
const previewImageModal = document.querySelector("#previewImageModal");
const previewImageImageEl = previewImageModal.querySelector(".modal__image");
const previewImageTextEl = previewImageModal.querySelector(".modal__caption");
const closeImageModal = previewImageModal.querySelector(".modal__close");

// Form settings
const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Enable form validation
const addCardFormValidator = new FormValidator(settings, cardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(settings, profileModalForm);
profileFormValidator.enableValidation();

function addCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// Render card function using Card class
function renderCard(cardData, cardListEl) {
  const cardElement = addCard(cardData);
  cardListEl.prepend(cardElement);
}

// Image click handler
function handleImageClick(cardInstance) {
  previewImageImageEl.src = cardInstance.link;
  previewImageTextEl.textContent = cardInstance.name;
  previewImageImageEl.alt = cardInstance.name;
  openPopup(previewImageModal);
}

// Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  // closePopup(profileEditModal);
  profileFormModal.close();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  addCardFormValidator.resetValidation();
  cardAddModal.close();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  // openPopup(profileEditModal);
  profileFormModal.open();
  profileFormValidator.resetValidation();
});

profileEditModalClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);
cardModalClose.addEventListener("click", () => cardAddModal.close());
closeImageModal.addEventListener("click", () => closePopup(previewImageModal));

profileModalForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => cardAddModal.open());
cardForm.addEventListener("submit", handleAddCardSubmit);


