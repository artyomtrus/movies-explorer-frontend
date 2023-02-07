import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import React from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const { pathname } = useLocation();
  const [numberShownMovies, setNumberShownMovies] = React.useState(0);

  function shownMovies() {
    const display = window.innerWidth;
    if (display > 1100) {
      setNumberShownMovies(12);
    } else if (display > 720) {
      setNumberShownMovies(8);
    } else if (display < 720) {
      setNumberShownMovies(5);
    }
  }

  React.useEffect(() => {
    shownMovies();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownMovies);
    }, 1000);
  });

  function showMoreMovies() {
    const display = window.innerWidth;
    if (display > 1100) {
      setNumberShownMovies(numberShownMovies + 3);
    } else {
      setNumberShownMovies(numberShownMovies + 2);
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
