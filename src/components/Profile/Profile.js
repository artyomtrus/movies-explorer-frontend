import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setEmail(currentUser.email);
    setName(currentUser.name);
  }, [currentUser]);

  React.useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, email]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email,
      name,
    });
  }

  function onSignOut() {
    props.onSignOut();
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          className="profile__form"
          name="profileForm"
          onSubmit={handleSubmit}
        >
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
          <span className="profile__span-error">{props.profileError}</span>
          <button
            disabled={isValid}
            className={`profile__button ${
              !isValid ? "" : "profile__button_disabled"
            }`}
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
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
