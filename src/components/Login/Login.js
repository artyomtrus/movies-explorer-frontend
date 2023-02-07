import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import "../Header/Header.css";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuthorize(values.email, values.password);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__link">
          <img src={logo} alt="логотип" className="login__logo" />
        </Link>
        <h3 className="login__title">Рады видеть!</h3>
        <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
          <label className="login__label">
            <p className="login__inscription">E-mail</p>
            <input
              id="email-input"
              type="email"
              name="email"
              className="login__email"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.email || ""}
              pattern="^\S+@\S+\.\S+$"
              required
            />
            <span className="login__error">{errors.email}</span>
          </label>
          <label className="login__label">
            <p className="login__inscription">Пароль</p>
            <input
              id="password-input"
              type="password"
              name="password"
              className="login__password"
              minLength="2"
              maxLength="200"
              onChange={handleChange}
              value={values.password || ""}
              required
            />
            <span className="login__error">{errors.password}</span>
          </label>
          <div className="login__button-area">
            <span className="login__button-error">{props.loginError}</span>
            <button
              disabled={!isValid}
              className={`login__button ${
                isValid ? "" : "login__button_disabled"
              }`}
              type="submit"
              aria-label="Войти"
            >
              Войти
            </button>
            <span className="login__span">
              Еще не зарегистрированы?
              <Link to="/signup" className="login__span-link">
                Регистрация
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Login);
