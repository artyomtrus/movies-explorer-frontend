import "./AboutMe.css";
import avatar from "../../images/avatar-min.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info-container">
          <h3 className="about-me__name">Артём</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__info">
            Я родился и живу в Минске, закончил факультет экономики СГУ. У меня
            есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="https://github.com/artyomtrus" className="about-me__social">
            GitHub
          </a>
        </div>
        <div className="about-me__avatar">
          <img
            className="about-me__avatar-img"
            src={avatar}
            alt="аватар создателя"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
