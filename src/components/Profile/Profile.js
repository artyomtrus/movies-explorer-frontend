import React from "react";
import "./Profile.css";

function Profile() {
  const [email, setEmail] = React.useState("qweqwe@qwe.ru");
  const [name, setName] = React.useState("Артём");

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" name="profileForm">
          <div className="profile__input-container">
            <span className="profile__input-text">Имя</span>
            <input
              id="name-input"
              type="text"
              name="name"
              className="profile__input profile__name"
              minLength="2"
              maxLength="200"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name || ""}
              required
            />
          </div>
          <div className="profile__input-container">
            <span className="profile__input-text">E-mail</span>
            <input
              id="email-input"
              type="email"
              name="email"
              className="profile__input profile__email"
              minLength="2"
              maxLength="40"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email || ""}
              required
            />
          </div>
          <button
            className="profile__button"
            type="submit"
            aria-label="Редактировать аккаунт"
          >
            Редактировать
          </button>
        </form>
        <button
          type="submit"
          className="profile__logout"
          aria-label="Выйти из аккаунта"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
