import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  const isLogged = false;

  function toggleBurger() {
    const burger = document.querySelector(".navigation__burger-icon");
    const navbar = document.querySelector(".navigation__navbar_logged");
    navbar.classList.toggle("navigation__navbar_logged_active");
    burger.classList.toggle("navigation__burger-icon_active");
  }

  return (
    <>
      {!isLogged ? (
        <nav className="navigation navigation__navbar">
          <Link to="/signup" className="navigation__link">
            <p className="navigation__sign">Регистрация</p>
          </Link>
          <Link to="/signin" className="navigation__link">
            <button className="navigation__button" type="button">
              Войти
            </button>
          </Link>
        </nav>
      ) : (
        <>
          <div className="navigation">
            <div className="navigation__burger" onClick={toggleBurger}>
              <div className="navigation__burger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <ul className="navigation__navbar navigation__navbar_logged">
              <li className="navigation__item hidden">
                <NavLink
                  exact
                  to="/"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Главная
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/movies"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/saved-movies"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
              <li className="navigation__item navigation__item_profile">
                <Link to="/profile" className="navigation__profile-name">
                  Аккаунт
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
