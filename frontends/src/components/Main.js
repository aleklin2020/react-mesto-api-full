import React from "react";
import "../index.css";
import avatar from "../image/profile/image.jpg";
import button from "../image/profile/add-button.svg";
import Card from "./Card.js";
import App from "./App.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile-informashion">
        <div className="profile">
          <div className="profile-page">
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            >
              <img
                className="profile__avatar"
                alt="Аватарка"
                src={currentUser.avatar}
              />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__box">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__bedit-button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile-informashion__button"
          name="editing"
          type="button"
          onClick={props.onAddPlace}
        >
          <img alt="Кнопка" src={button} />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;

