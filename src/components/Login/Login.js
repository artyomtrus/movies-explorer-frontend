import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import "../Header/Header.css";
import logo from "../../images/logo.svg";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuthorize(email, password);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__link">
          <img src={logo} alt="логотип" className="login__logo" />
        </Link>
        <h3 className="login__title">Рады видеть!</h3>
        <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
          <p className="login__inscription">E-mail</p>
          <input
            id="email-input"
            type="email"
            name="email"
            className="login__email"
            minLength="2"
            maxLength="40"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <p className="login__inscription">Пароль</p>
          <input
            id="password-input"
            type="password"
            name="password"
            className="login__password"
            minLength="2"
            maxLength="200"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="login__button" type="submit" aria-label="Войти">
            Войти
          </button>
          <span className="login__span">
            Еще не зарегистрированы?
            <Link to="/signup" className="login__span-link">
              Регистрация
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Login);
