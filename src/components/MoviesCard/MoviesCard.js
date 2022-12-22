import React from "react";
import "./MoviesCard.css";
import image from "../../images/movies-card-image.jpg";

function MoviesCard() {
  const [saved, setSaved] = React.useState(false);

  const moviesCardSavedButtonClassName = `${
    saved
      ? "movies-card__button movies-card__button_saved"
      : "movies-card__button"
  }`;

  function handleSavedClick() {
    if (saved === true) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__title-container">
        <h2 className="movies-card__title">В погоне за Бенкси</h2>
        <p className="movies-card__time">27 минут</p>
      </div>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="movies-card__image"
      ></div>
      <button
        className={moviesCardSavedButtonClassName}
        onClick={handleSavedClick}
      >
        {!saved ? "Сохранить" : ""}
      </button>
    </li>
  );
}

export default MoviesCard;
