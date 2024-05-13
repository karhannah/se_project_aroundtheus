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
const profileAddModal = document.querySelector("#profileAddModal");
const profileAddModalClose = document.querySelector(
  "#profile__add-modal-close"
);
const profileEditForm = document.querySelector("#add-form");
const cardTitleInput = profileAddModal.querySelector("#modal__new-title");
const cardImageInput = profileAddModal.querySelector("#modal__new-description");
const previewImageModal = document.querySelector("#previewImageModal");
const previewImageImageEl = previewImageModal.querySelector(".modal__image");
const previewImageTextEl = previewImageModal.querySelector(".modal__caption");
const closeImageModal = previewImageModal.querySelector(".modal__close");

// Functions
function openPopup(modal) {
  const errorInputs = modal.querySelectorAll(".modal__input_type_error");
  errorInputs.forEach((input) => {
    input.classList.remove("modal__input_type_error");
    const errorMessage = modal.querySelector(`#${input.id}-error`);
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.classList.remove("modal__error_visible");
    }
  });

  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeModalOverlay);

  const errorInputs = modal.querySelectorAll(".modal__input_type_error");
  errorInputs.forEach((input) => {
    input.classList.remove("modal__input_type_error");
    const errorMessage = modal.querySelector(`#${input.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove("modal__error_visible");
  });

  const form = modal.querySelector("form");
  if (form) {
    form.reset();
  }
}

function closeModalEscape(event) {
  if (event.key === "Escape") {
    closePopup(profileEditModal);
    closePopup(profileAddModal);
    closePopup(previewImageModal);
  }
}

function closeModalOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup(profileEditModal);
    closePopup(profileAddModal);
    closePopup(previewImageModal);
  }
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageImageEl.src = cardData.link;
    previewImageTextEl.textContent = cardData.name;
    previewImageImageEl.alt = cardData.name;
    openPopup(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
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
  cardTitleInput.value = "";
  cardImageInput.value = "";
  closePopup(profileAddModal);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

profileEditModalClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileAddModalClose.addEventListener("click", () =>
  closePopup(profileAddModal)
);

closeImageModal.addEventListener("click", () => closePopup(previewImageModal));

profileModalForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

profileEditForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
