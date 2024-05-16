function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(`.${options.formSelector}`)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
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
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputList = [...formEl.querySelectorAll(`.${inputSelector}`)];
  const submitButton = formEl.querySelector(`.${submitButtonSelector}`);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });

  toggleButtonState(inputList, submitButton, options);
}

const config = {
  formSelector: "modal__form",
  inputSelector: "modal__input",
  submitButtonSelector: "modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
