// b73a4638-eb7a-419c-8b34-f34f4d770b05 auth token

export default class Api {
  constructor(key, url) {
    this._key = key;
    this._url = url;
  }

  getPromiseAll(funcs) {
    return Promise.all(funcs)
  }

  // Profile

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });
  }

  updateProfileInfo({title, job}) { // Fix these, 400 bad request
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._key,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: title,
        about: job
      })
    })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  updateProfileIcon(link) { // these too
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._key,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  // Cards

  getInitialCards() { // GET all cards
    return fetch(this._url, {
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });
  }

  postNewCard(name, link) { // POST new card
    return fetch(this._url, {
      method: "POST",
      headers: {
        authorization: this._key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  deleteCard(id) {
    return fetch(this._url + "/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._key,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
  } // DELETE new card

  likeCard(id) {
    return fetch(this._url + "/" + id + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
  } // PUT like

  dislikeCard(id) {
    return fetch(this._url + "/" + id + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    }); // DELETE like
  }
}