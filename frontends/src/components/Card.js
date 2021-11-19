import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `popup_element ${
    isOwn ? "elemenet__icon-delete" : ""
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__vector-like ${
    isLiked ? "element__vector-active" : ""
  }`;
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__image"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <p className="element__like">{props.card.likes.length}</p>
      </div>
    </div>
  );
}
export default Card;

