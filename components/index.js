import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../src/pages/index.css";
import Popup from "./popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import * as constants from "./constants.js";

const section = new Section ({items:constants.initialCards, renderer: addCard}, ".gallery__cards");
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const profileInfo = new UserInfo("Jacques Cousteau", "Explorer");
  const cardListEl = document.querySelector(".gallery__cards");
  const addNewCardButton = document.querySelector("#profile__add-button");
  const profileTitle = document.querySelector("#profile__title");
  const profileDescription = document.querySelector("#profile__description");
  const profileTitleInput = document.querySelector("#modal__title");
  const profileDescriptionInput = document.querySelector("#modal__description");
  const profileEditButton = document.querySelector("#profile__edit-button");
  const profileEditModal = document.querySelector("#profileEditModal");
  const profileEditModalClose = document.querySelector("#profile__edit-modal-close");
  const profileModalForm = document.querySelector("#profile-form");

  const cardModalClose = document.querySelector("#profile__add-modal-close");
  const cardForm = document.querySelector("#add-form");
const profileFormModal = new PopupWithForm({popupSelector:"#profileEditModal", handleFormSubmit:handleProfileEditSubmit});
const cardAddModal = new PopupWithForm ({popupSelector:"#cardModal", handleFormSubmit:handleAddCardSubmit});
const previewImagePopup = new PopupWithImage("#previewImageModal");
const cardTitleInput = cardAddModal.modal.querySelector("#modal__new-title");
const cardImageInput = cardAddModal.modal.querySelector("#modal__new-description");
const previewImageImageEl = previewImagePopup.modal.querySelector(".modal__image");
const closeImageModal = previewImagePopup.modal.querySelector(".modal__close");
const addCardFormValidator = new FormValidator(constants.settings, cardForm);
const profileFormValidator = new FormValidator(constants.settings, profileModalForm);

// Enable form validation

section.renderItems();

addCardFormValidator.enableValidation();

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
  previewImageImageEl.alt = cardInstance.name;
  previewImagePopup.open(cardInstance.link, cardInstance.name);
}

// 
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileInfo.setUserInfo({name:profileTitleInput.value, job:profileDescriptionInput.value});
  profileTitle.textContent = profileInfo.getUserInfo().name;
  profileDescription.textContent = profileInfo.getUserInfo().job;
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
  profileFormModal.open();
  profileFormValidator.resetValidation();
});

profileEditModalClose.addEventListener("click", () => {
  profileFormModal.close();
});
cardModalClose.addEventListener("click", () => cardAddModal.close());
closeImageModal.addEventListener("click", () => previewImagePopup.close());

//profileModalForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => cardAddModal.open());
// cardForm.addEventListener("submit", handleAddCardSubmit);


