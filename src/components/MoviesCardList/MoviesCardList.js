import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import React from "react";
import Preloader from "../Preloader/Preloader";
import {
  FULLSCREEN_COUNT,
  FULLSCREEN_NUMBER_MOVIES,
  FULLSCREEN_RESOLUTION,
  MOBILE_NUMBER_MOVIES,
  TABLET_COUNT,
  TABLET_NUMBER_MOVIES,
  TABLET_RESOLUTION,
} from "../../utils/constants";

function MoviesCardList(props) {
  const { pathname } = useLocation();
  const [numberShownMovies, setNumberShownMovies] = React.useState(0);

  function shownMovies() {
    const display = window.innerWidth;
    if (display > FULLSCREEN_RESOLUTION) {
      setNumberShownMovies(FULLSCREEN_NUMBER_MOVIES);
    } else if (display > TABLET_RESOLUTION) {
      setNumberShownMovies(TABLET_NUMBER_MOVIES);
    } else if (display < TABLET_RESOLUTION) {
      setNumberShownMovies(MOBILE_NUMBER_MOVIES);
    }
  }

  React.useEffect(() => {
    shownMovies();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownMovies);
    }, FULLSCREEN_RESOLUTION);
  });

  function showMoreMovies() {
    const display = window.innerWidth;
    if (display > FULLSCREEN_RESOLUTION) {
      setNumberShownMovies(numberShownMovies + FULLSCREEN_COUNT);
    } else {
      setNumberShownMovies(numberShownMovies + TABLET_COUNT);
    }
  }

  return (
    <section className="movies-card-list">
      {props.isLoading ? (
        <Preloader />
      ) : props.isNotFound ? (
        <p className="movies-card-list__error">Ничего не найдено</p>
      ) : (
        <>
          {pathname === "/saved-movies" ? (
            <ul className="movies-card-list__list">
              {props.movies.map((movie) => (
                <MoviesCard
                  movie={movie}
                  savedMovies={props.savedMovies}
                  key={movie.id || movie.movieId}
                  handleSavedMovie={props.handleSavedMovie}
                  handleDeleteMovie={props.handleDeleteMovie}
                />
              ))}
            </ul>
          ) : (
            <>
              <ul className="movies-card-list__list">
                {props.movies.slice(0, numberShownMovies).map((movie) => (
                  <MoviesCard
                    movie={movie}
                    savedMovies={props.savedMovies}
                    key={movie.id || movie.movieId}
                    handleSavedMovie={props.handleSavedMovie}
                    handleDeleteMovie={props.handleDeleteMovie}
                  />
                ))}
              </ul>
              {props.movies.length > numberShownMovies ? (
                <button
                  className="movies-card-list__more-button"
                  onClick={showMoreMovies}
                >
                  Еще
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
