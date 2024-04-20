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
const profileAddForm = document.querySelector("#profile__add-form");
const profileAddModal = document.querySelector("#profileAddModal");
const profileAddModalClose = document.querySelector(
  "#profile__add-modal-close"
);
const profileEditForm = document.querySelector(".profile__edit-form");
const cardTitleInput = profileAddModal.querySelector("#modal__title");
const cardImageInput = profileAddModal.querySelector("#modal__description");
const previewImageModal = document.querySelector("#previewImageModal");
const previewImageImageEl = previewImageModal.querySelector(".modal__image");
const previewImageTextEl = previewImageModal.querySelector(".modal__caption");
const closeImageModal = previewImageModal.querySelector(".modal__close");

// Functions
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  profileAddModal.classList.remove("modal_opened");
  previewImageModal.classList.remove("modal_opened");
}

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
    previewImageModal.classList.add("modal_opened");
  });
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.appendChild(cardElement);
}

// Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  console.log(name);
  console.log(link);
  renderCard({ name, link }, cardListEl);
  closePopup();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});

profileEditModalClose.addEventListener("click", closePopup);
profileAddModalClose.addEventListener("click", () => {
  profileAddModal.classList.remove("modal_opened");
});

closeImageModal.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});

profileAddModal.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.appendChild(cardElement);
});
