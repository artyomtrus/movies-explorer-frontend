class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._getResponseData = this._getResponseData.bind(this);
  }

  registration(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(this._getResponseData);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  editUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
      }),
    }).then(this._getResponseData);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: "https://api.nomoreparties.co" + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail:
          "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
      }),
    }).then(this._getResponseData);
  }

  deleteMovie(data) {
    return fetch(`${this._baseUrl}/movies/${data._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const mainApi = new MainApi({
  baseUrl: "https://api.filmopoisk.trus.nomoredomains.icu",
});

export default mainApi;
