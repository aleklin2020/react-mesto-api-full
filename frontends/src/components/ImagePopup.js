import React from "react";
function ImagePopup(props) {
  return (
    <div
      className={`popup popup_open-blocks ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container-blocks">
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <h2 className="popup__titles">{props.card.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;