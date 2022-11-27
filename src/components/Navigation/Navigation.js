import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  const isLogged = true;
  return (
    <>
      {!isLogged ? (
        <nav className="navigation__navbar">
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
          <ul className="navigation__navbar navigation__navbar_logged">
            <li className="navigation__link">
              <NavLink
                to="/movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__link">
              <NavLink
                to="saved-movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
          <Link className="navigation__profile">
            <button className="navigation__profile-name">Аккаунvvvvv</button>
          </Link>
        </>
      )}
    </>
  );
}

export default Navigation;
