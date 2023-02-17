import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function Movies(props) {
  return (
    <>
      <SearchForm getMovies={props.getMovies} />
      <MoviesCardList
        movies={props.movies}
        savedMovies={props.savedMovies}
        handleSavedMovie={props.handleSavedMovie}
        handleDeleteMovie={props.handleDeleteMovie}
        isLoading={props.isLoading}
        isNotFound={props.isNotFound}
      />
    </>
  );
}

export default Movies;
