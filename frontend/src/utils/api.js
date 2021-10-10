class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._contentType = options.headers['Content-Type'];
    //this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
    },
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
    },
  })
    .then(this._checkResponse);
  }

  updateUserInfo(name, info, token) {
    return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': this._contentType
    },
    body: JSON.stringify({
      name: name,
      about: info
    })
    })
    .then(this._checkResponse);
  }

  updateAvatar(link, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this._contentType
    },
      body: JSON.stringify({
        avatar: link
      })
      })
      .then(this._checkResponse);
  }

  addNewCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
      })
      .then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this._contentType
      },
    })
      .then(this._checkResponse);
  }

  /*setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }*/

  changeLikeCardStatus(cardId, isLiked, token) {
    if(isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': this._contentType
        },
      })
        .then(this._checkResponse);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': this._contentType
        },
      })
        .then(this._checkResponse);
    }
  }
}

const api = new Api({
  baseUrl: /* 'https://api.maxfront.nomoredomains.club' */ 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;
