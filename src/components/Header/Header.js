import "./Header.css";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header header_theme_landing">
      <img src={logo} alt="логотип" className="header__logo" />
      <nav className="header__navbar">
        <p className="header__sign">Регистрация</p>
        <button className="header__button">Войти</button>
      </nav>
    </header>
  );
}

export default Header;
