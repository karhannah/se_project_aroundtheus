function showInputError(formEl, inputList, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputList.id}-error`);
  inputList.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputList.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputList, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputList.id}-error`);
  if (errorMessageEl) {
    inputList.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  } else {
    console.warn("Warning: errorMessageEl is null or undefined.");
  }
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

function checkInputValidity(formEl, inputList, options) {
  if (!inputList.validity.valid) {
    showInputError(formEl, inputList, options);
  } else {
    hideInputError(formEl, inputList, options);
  }
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidInput(inputList) {
  return !inputList.every((input) => input.validity.valid);
}

function toggleButtonState(inputLists, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputLists)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputLists = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  inputLists.forEach((inputList) => {
    inputList.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputList, options);
      toggleButtonState(inputLists, submitButton, options);
    });
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
