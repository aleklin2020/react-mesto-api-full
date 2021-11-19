class Api {
  constructor({ link, headers }) {
    this._baseUrl = link;
    this._headers = headers;
  }
    

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error("Произошла ошибка ${res.status}"));
    }
  }
  // Получение информаций профиля с сервера
  getUserInform() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
      // credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // обновление информаций на сервере
  setUserInform(name, profession) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
     // credentials: 'include',
       headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Обновление аватара на сервере
  getAvatarProfile(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
     // credentials: 'include',
       headers: this._headers,
      body: JSON.stringify({
       avatar: avatar
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Получение обекта карточек с сервера
  getIntialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
     // credentials: 'include',
       headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Добавление карточек на сервер
  photoAddServer(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
     // credentials: 'include',
       headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Добавление/удаление лайков
 LikeCard(id, like) {
        if (like) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
               // credentials: 'include',
                 headers: this._headers,
            })
            .then(res => {return this._checkResponse(res)})
         } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
              //  credentials: 'include',
                 headers: this._headers,
            })
            .then(res => {return this._checkResponse(res)})
         }
    }
  // удаление карточек
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
    //  credentials: 'include',
       headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

    updateHeaders() {
      this._headers = {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${localStorage.getItem('jwt')}`
      }
    }

}
const api = new Api({
  link: "http://api.pictures-host.nomoredomains.rocks",
   headers: {
   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});
export default api;
