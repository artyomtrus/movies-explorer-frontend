import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [name, setName] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [isSavedChecked, setIsSavedChecked] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    let checkbox = localStorage.getItem("checkbox");
    let checkboxSaved = localStorage.getItem("checkboxSaved");
    setIsChecked(JSON.parse(checkbox));
    setIsSavedChecked(JSON.parse(checkboxSaved));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.getMovies(name);
    if (pathname === "/saved-movies") {
      props.isSaveSearch(true);
    }
  }

  function onChange() {
    if (pathname === "/saved-movies") {
      if (isSavedChecked) {
        setIsSavedChecked(false);
        localStorage.setItem("checkboxSaved", !isSavedChecked);
      } else {
        setIsSavedChecked(true);
        localStorage.setItem("checkboxSaved", !isSavedChecked);
      }
    } else {
      if (isChecked) {
        setIsChecked(false);
        localStorage.setItem("checkbox", !isChecked);
      } else {
        setIsChecked(true);
        localStorage.setItem("checkbox", !isChecked);
      }
    }
  }

  function handleChecked() {
    let checkbox = localStorage.getItem("checkbox");
    let checkboxSaved = localStorage.getItem("checkboxSaved");
    if (
      pathname === "/saved-movies"
        ? JSON.parse(checkboxSaved)
        : JSON.parse(checkbox)
    ) {
      return "checked";
    } else {
      return "";
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <button className="search-form__button">Поиск</button>
      </form>
      <div className="search-form__checkbox-container">
        <input
          className="search-form__checkbox"
          type="checkbox"
          checked={handleChecked()}
          onChange={onChange}
          id="switch"
        />
        <label className="search-form__switch" htmlFor="switch"></label>
        <span className="search-form__text">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;
