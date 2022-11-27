import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import "../Login/Login.css";
import logo from "../../images/logo.svg";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuthorize(name, email, password);
  }

  return (
    <section className="login-page">
      <main className="login">
        <div className="login__container">
          <Link to="/" className="login__link">
            <img src={logo} alt="логотип" className="login__logo" />
          </Link>
          <h3 className="login__title">Добро пожаловать!</h3>
          <form
            className="login__form"
            name="loginForm"
            onSubmit={handleSubmit}
          >
            <p className="login__inscription">Имя</p>
            <input
              id="name-input"
              type="name"
              name="name"
              className="login__email"
              minLength="2"
              maxLength="40"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
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
              Зарегистрироваться
            </button>
            <span className="login__span">
              Уже зарегистрированы?
              <Link to="/signin" className="login__span-link">
                Войти
              </Link>
            </span>
          </form>
        </div>
      </main>
    </section>
  );
}

export default withRouter(Register);
