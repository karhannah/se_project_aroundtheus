import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constants from "../utils/constants.js";
import Api from "../components/API.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

const api = new Api(
  "b73a4638-eb7a-419c-8b34-f34f4d770b05",
  "https://around-api.en.tripleten-services.com/v1/cards"
);

const section = new Section({ renderer: addCard }, ".gallery__cards");

api
  .getInitialCards()
  .then((result) => {
    result.forEach((card) => {
      section.addItem({
        name: card.name,
        link: card.link,
        id: card._id,
        isLiked: card.isLiked,
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

const profileInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
});

api
  .getUserInfo()
  .then((result) => {
    profileInfo.setUserInfo({ name: result.name, job: result.about });
    document
      .getElementById("profile__image")
      .setAttribute("src", result.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const addNewCardButton = document.querySelector("#profile__add-button");
const profileTitleInput = document.querySelector("#modal__title");
const profileDescriptionInput = document.querySelector("#modal__description");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModalForm = document.querySelector("#profile-form");
const cardForm = document.querySelector("#add-form");

const confirmModal = new PopupConfirmation("#confirmationModal");
confirmModal.setEventListeners();

const profileFormModal = new PopupWithForm({
  popupSelector: "#profileEditModal",
  handleFormSubmit: handleProfileEditSubmit,
  confirmModal: confirmModal,
});
profileFormModal.setEventListeners();

const profileImageModal = new PopupWithForm({
  popupSelector: "#profileImageModal",
  handleFormSubmit: handleProfileImageSubmit,
  confirmModal: confirmModal,
});
profileImageModal.setEventListeners();

document
  .querySelector(".profile__image__overlay")
  .addEventListener("click", () => {
    profileImageModal.open();
  });

const cardAddModal = new PopupWithForm({
  popupSelector: "#cardModal",
  handleFormSubmit: handleAddCardSubmit,
  confirmModal: confirmModal,
});
cardAddModal.setEventListeners();

const previewImagePopup = new PopupWithImage("#previewImageModal");
previewImagePopup.setEventListeners();

const addCardFormValidator = new FormValidator(constants.settings, cardForm);
const profileFormValidator = new FormValidator(
  constants.settings,
  profileModalForm
);

// Enable form validation

addCardFormValidator.enableValidation();

profileFormValidator.enableValidation();

function addCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    confirmModal
  );
  return { view: card.getView(), card: card };
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
  profileInfo.setUserInfo({
    name: inputs["title"],
    job: inputs["description"],
  });
  api
    .updateProfileInfo({ title: inputs["title"], job: inputs["description"] })
    .then((result) => {
      //console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  profileFormModal.close();
}

function handleProfileImageSubmit(e, inputs) {
  api
    .updateProfileIcon(inputs["link"])
    .then((result) => {
      //console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(document.getElementById("profile__image"));
  document.getElementById("profile__image").setAttribute("src", inputs["link"]);
  profileImageModal.close();
}

function handleAddCardSubmit(e, inputs) {
  api.postNewCard(inputs["title"], inputs["description"]).then((res) => {
    renderCard({
      name: inputs["title"],
      link: inputs["description"],
      id: res._id,
      isLiked: res.isLiked,
    });
  });
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
