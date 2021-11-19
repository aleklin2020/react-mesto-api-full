import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import { useState } from "react";
function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setAbout] = useState("");

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(e);
    // Передаём значения управляемых компонентов во внешний обработчик

    props.onUpdateUser({
      name: name ,
      about: description,
    });
  }
  return (
    <PopupWithForm
      className="overlay_type_edit"
      popupTitle="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formName="profile-popup"
      formButtonContent="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          className="form__input form__input_name"
          required
          placeholder="Ваше имя"
          value={name}
          onChange={handleChangeName}
        />
      </label>
      <span className="form-name-input-error"></span>
      <label className="form__label" />
      <input
        type="text"
        minLength="2"
        maxLength="200"
        name="job"
        className="form__input form__input_job"
        required
        placeholder="Ваша профессия"
        value={description}
        onChange={handleChangeAbout}
      />
      <span className="form-job-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;