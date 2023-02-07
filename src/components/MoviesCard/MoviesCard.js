import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const hours = Math.floor(props.movie.duration / 60);
  const minutes = props.movie.duration % 60;
  const isSaved = props.savedMovies.some(
    (i) => i.movieId === props.movie.id || props.movie.movieId
  );
  const moviesCardSavedButtonClassName = `${
    isSaved
      ? "movies-card__button movies-card__button_saved"
      : "movies-card__button"
  }`;

  function handleClick(e) {
    e.preventDefault();
    if (isSaved) {
      props.handleDeleteMovie(props.movie);
    } else {
      props.handleSavedMovie(props.movie);
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__title-container">
        <h2 className="movies-card__title">{props.movie.nameRU}</h2>
        <p className="movies-card__time">
          {hours !== 0 ? `${hours}ч` : ""} {minutes !== 0 ? `${minutes}м` : ""}
        </p>
      </div>
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <div
          style={{
            backgroundImage:
              typeof props.movie.image === "string"
                ? `url(${props.movie.image})`
                : `url(https://api.nomoreparties.co/${props.movie.image.url})`,
          }}
          className="movies-card__image"
        ></div>
      </a>

      <button className={moviesCardSavedButtonClassName} onClick={handleClick}>
        {!isSaved ? "Сохранить" : ""}
      </button>
    </li>
  );
}

export default MoviesCard;
