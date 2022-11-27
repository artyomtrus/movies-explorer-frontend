import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button className="search-form__button">Поиск</button>
      </form>
      <div className="search-form__checkbox-container">
        <input className="search-form__checkbox" type="checkbox" id="switch" />
        <label className="search-form__switch" htmlFor="switch"></label>
        <span className="search-form__text">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;
