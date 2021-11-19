import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const userAvatar = React.useRef(); // записываем объект, возвращаемый хуком, в переменную
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar(userAvatar.current.value);
  }
  return (
    <PopupWithForm
      className="overlay_type_setAvatar"
      popupTitle="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formName="popup_avatar"
      formButtonContent="Обновить"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          type="url"
          ref={userAvatar}
          name="newAvatar"
          className="form__input form__input_job form__input-active"
          required
          placeholder="Ссылка на новый аватар"
          defaultValue=""
        />
        <span className="form-link-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

