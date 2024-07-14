import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constants from "../../utils/constants.js";

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
  const profileModalForm = document.querySelector("#profile-form"); 
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
  section.addItem(cardElement);
}

// Image click handler
function handleImageClick(cardInstance) {
  previewImagePopup.open(cardInstance.link, cardInstance.name);
}

//
function handleProfileEditSubmit(e) {
  e.preventDefault();
  // profileInfo.setUserInfo(profileFormModal.getInputs());
  let inputs = profileFormModal.getInputs();
  profileInfo.setUserInfo({name:inputs[0], job:inputs [1]});
  profileFormModal.close();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  let inputs = cardAddModal.getInputs();
  renderCard({ name: inputs[0], link: inputs[1] });
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

//profileModalForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => cardAddModal.open());
// cardForm.addEventListener("submit", handleAddCardSubmit);


