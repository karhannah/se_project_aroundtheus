import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const cardModal = document.querySelector("#cardModal");
const cardModalClose = document.querySelector("#profile__add-modal-close");
const cardForm = document.querySelector("#add-form");
const cardTitleInput = cardModal.querySelector("#modal__new-title");
const cardImageInput = cardModal.querySelector("#modal__new-description");
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

// Functions
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopup(openModal);
    }
  }
}

function closeModalOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

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
  previewImageImageEl.src = cardInstance._link;
  previewImageTextEl.textContent = cardInstance._name;
  previewImageImageEl.alt = cardInstance._name;
  openPopup(previewImageModal);
}

// Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(cardModal);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
  profileFormValidator._resetValidation();
});

profileEditModalClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);
cardModalClose.addEventListener("click", () => closePopup(cardModal));
closeImageModal.addEventListener("click", () => closePopup(previewImageModal));

profileModalForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => openPopup(cardModal));
cardForm.addEventListener("submit", handleAddCardSubmit);

// Render initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
