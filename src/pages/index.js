import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constants from "../utils/constants.js";

const section = new Section ({items:constants.initialCards, renderer: addCard}, ".gallery__cards");
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const profileInfo = new UserInfo({nameSelector: "#profile__title", jobSelector: "#profile__description"});

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
profileFormModal.setEventListeners();

const cardAddModal = new PopupWithForm ({popupSelector:"#cardModal", handleFormSubmit:handleAddCardSubmit});
cardAddModal.setEventListeners();

const previewImagePopup = new PopupWithImage("#previewImageModal");
previewImagePopup.setEventListeners();

const addCardFormValidator = new FormValidator(constants.settings, cardForm);
const profileFormValidator = new FormValidator(constants.settings, profileModalForm);

// Enable form validation

addCardFormValidator.enableValidation();

profileFormValidator.enableValidation();

function addCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// Render card function using Card class
function renderCard(cardData, cardListEl) {
  section.addItem(cardData);
}

// Image click handler
function handleImageClick(cardInstance) {
  previewImagePopup.open(cardInstance.link, cardInstance.name);
}

//
function handleProfileEditSubmit(e, inputs) {
  profileInfo.setUserInfo({name:inputs["title"], job:inputs ["description"]});
  profileFormModal.close();
}

function handleAddCardSubmit(e, inputs) {
  renderCard({ name: inputs["title"], link: inputs["description"] });
  e.target.reset();
  addCardFormValidator.toggleButtonState();
  cardAddModal.close();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileInfo.getUserInfo().name;
  profileDescriptionInput.value = profileInfo.getUserInfo().job.trim();
  profileFormModal.open();
  profileFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => cardAddModal.open());


