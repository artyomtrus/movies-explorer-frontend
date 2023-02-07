import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import "../Login/Login.css";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegistration(values.email, values.password, values.name);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__link">
          <img src={logo} alt="логотип" className="login__logo" />
        </Link>
        <h3 className="login__title">Добро пожаловать!</h3>
        <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
          <label className="login__label">
            <p className="login__inscription">Имя</p>
            <input
              id="name-input"
              type="name"
              name="name"
              className="login__email"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.name || ""}
              pattern={"^[A-Za-zА-Яа-яЁё /s -]+$"}
              required
            />
            <span className="login__error">{errors.name}</span>
          </label>
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
              pattern="^\S+@\S+\.\S+$"
              value={values.email || ""}
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
            <span className="login__button-error">{props.registerError}</span>
            <button
              disabled={!isValid}
              className={`login__button ${
                isValid ? "" : "login__button_disabled"
              }`}
              type="submit"
              aria-label="Войти"
            >
              Зарегистрироваться
            </button>
            <span className="login__span">
              Уже зарегистрированы?
              <Link to="/signin" className="login__span-link">
                Войти
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Register);
