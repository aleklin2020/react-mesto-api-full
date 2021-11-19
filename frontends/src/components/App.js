import React from "react";
import "../index.css";
import headerVektor from "../image/header/Vector.svg";
import avatar from "../image/profile/image.jpg";
import button from "../image/profile/add-button.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import registrationOk from "../image/authorization-ok.svg";
import registrationWrong from "../image/authorization-bad.svg";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setСurrentUser] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (loggedIn) {
    api
      .getUserInform()
      .then((data) => {
        setСurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
    api
      .getIntialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => {
        console.log(`Error:${res}`);
      });
    }
  }, [loggedIn]);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .LikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(newName) {
    console.log(newName)
    api
      .setUserInform(newName.name, newName.about)
      .then((data) => {
        setСurrentUser(data.data);
        closeAllPopups();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    console.log(newAvatar);
    api
      .getAvatarProfile(newAvatar)
      .then((data) => {
        setСurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(newCard) {
    console.log(newCard);
    api
      .photoAddServer(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards ]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsTooltipOpen(false);

  }
  React.useEffect(() => {
    const handleEsc = (e) => {
      const ESC_KEYVODE = 27;
      if (e.keyCode === ESC_KEYVODE) {
        closeAllPopups();
      }
    };
    if (
      isEditProfilePopupOpen === true ||
      isEditAvatarPopupOpen === true ||
      isAddPlacePopupOpen === true ||
      isImagePopupOpen === true
    ) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
  ]);

  // новый код

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  
  const [message, setMessage] = React.useState({ iconPath: "", text: "" });
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handleInfoTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function handleInfoTooltipContent({ iconPath, text }) {
    setMessage({ iconPath: iconPath, text: text });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/sign-in");
  }

  function registration({ email, password }) {
       auth
      .register(email, password)
      .then((res) => {
           if (res.statusCode !== 201) {
          handleInfoTooltipContent({
            iconPath: registrationOk,
            text: "Вы успешно зарегестрировались!",
          });
          handleInfoTooltipOpen();
          setTimeout(history.push, 3000, "/sign-in");
          setTimeout(closeAllPopups, 2500);
        }})
      .catch((err) => {
        handleInfoTooltipContent({
          iconPath: registrationWrong,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
        handleInfoTooltipOpen();
        setTimeout(closeAllPopups, 2500);
        console.log(err);
      });
  }
  
  function authorization({ email, password }) {
    auth
      .authorize({ email, password })
     .then((data) => {
        if (!data) {
          throw new Error("Произошла ошибка");
        }

         auth.getContent(data)
          .then((res) => {
            setEmail(res.data.email);
          })
          .catch(err => console.log(err))

        setLoggedIn(true);
         api.getUserInform()
         .then((user) => setСurrentUser(user.data)
          
        )
          .catch((err) => {
            console.log(err)
          });


        handleInfoTooltipContent({
          iconPath: registrationOk,
          text: "Вы успешны авторизованы!",
        });
        setEmail(email);
        handleInfoTooltipOpen();
        setTimeout(history.push, 2500, "/");
        setTimeout(closeAllPopups, 2000);
      })
      .catch((err) => {
        handleInfoTooltipContent({
          iconPath: registrationWrong,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
        handleInfoTooltipOpen();
        setTimeout(closeAllPopups, 2000);
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header
            loggedIn={loggedIn}
            email={email}
            handleSignOut={handleSignOut}
          />
          <Switch>
            <Route path="/sign-in">
              <Login authorization={authorization} />
            </Route>
            <Route path="/sign-up">
              <Register registration={registration} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            ></ProtectedRoute>

            <Route path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            name="profile-popup"
            title="Редактировать профиль"
            submitText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
          <PopupWithForm
            name="popup_delete"
            title="Вы уверены"
            submitText="Да"
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            message={message}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

