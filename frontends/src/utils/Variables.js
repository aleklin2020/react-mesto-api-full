const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input_visible'
};
const options = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-25',
    token: {
        authorization: 'e46362ce-1599-486f-9051-b9d59ed9a09d',
        'Content-Type': 'application/json',
    },
}
export {
  validationConfig,
  options
}