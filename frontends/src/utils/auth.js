import api from './api'
export const BASE_URL = "http://api.pictures-host.nomoredomains.rocks";

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
     headers: {
      "Content-Type": "application/json",
   
    },
   // credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
 .then(checkResponse)
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
     headers: {
            
            'Content-Type': 'application/json'
        },
   // credentials: 'include',
    body: JSON.stringify({ email, password }),
    
  })
    .then(checkResponse)
   .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        api.updateHeaders();
        return data.token
      }
    }) 

    
    
};
//проверка токена
export const getContent = (token) => {
  console.log(token)
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
        },
   // credentials: 'include',
    
  })
    .then(checkResponse)
    .then(data => data)
};

