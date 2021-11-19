import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useState } from "react";

function EditPlacePopup(props) {
  const [namePlace, setNamePlace] = useState("");
  const [linkPlace, setLinkPlace] = useState("");

  function handleChangeNamePlace(e) {
    setNamePlace(e.target.value);
  }
  function handleChangeLinkPlace(e) {
    setLinkPlace(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    const dataCard = {};
    dataCard.name = namePlace;
    dataCard.link = linkPlace;
    props.onAddPlace(dataCard);
  }
  return (
    <PopupWithForm
      className="overlay_type_addPlace"
      popupTitle="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formName="popup_card"
      formButtonContent="Создать"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          type="text"
          minLength="2"
          maxLength="30"
          name="popup_element"
          className="form__input form__input_name"
          required
          placeholder="Название"
          value={namePlace}
          onChange={handleChangeNamePlace}
        />
        <span className="form-name-input-error"></span>
      </label>
      <input
        type="url"
        name="imgPlace"
        className="form__input form__input_job"
        required
        placeholder="Ссылка на картинку"
        value={linkPlace}
        onChange={handleChangeLinkPlace}
      />
      <span className="form-job-input-error"></span>
    </PopupWithForm>
  );
}
export default EditPlacePopup;

