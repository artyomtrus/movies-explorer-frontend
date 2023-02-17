import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function SavedMovies(props) {
  const [isSaveSearch, setIsSaveSearch] = React.useState(false);

  function handleSaveSearch(result) {
    setIsSaveSearch(result);
  }

  return (
    <div>
      <SearchForm getMovies={props.getMovies} isSaveSearch={handleSaveSearch} />
      <MoviesCardList
        movies={!isSaveSearch ? props.movies : props.filterSavedMovies}
        savedMovies={props.savedMovies}
        handleSavedMovie={props.handleSavedMovie}
        handleDeleteMovie={props.handleDeleteMovie}
        isNotFound={props.isNotFound}
      />
    </div>
  );
}

export default SavedMovies;
