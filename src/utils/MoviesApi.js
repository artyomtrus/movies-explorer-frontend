class MoviesApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._getResponseData = this._getResponseData.bind(this);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: {
        // authorization: `Bearer ${localStorage.getItem("token")}`,
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

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
