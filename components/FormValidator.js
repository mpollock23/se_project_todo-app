export class FormValidator {
  constructor(settings, element) {
    this._settings = settings;
    this._element = element;
  }
  _showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._element.querySelector(errorElementId);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._element.querySelector(errorElementId);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._element.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  resetValidation() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._settings.inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
    });
    const buttonElement = this._element.querySelector(
      this._settings.submitButtonSelector
    );
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}
