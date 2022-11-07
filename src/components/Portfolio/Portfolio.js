import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/artyomtrus/how-to-learn"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
          <span className="portfolio__arrow"></span>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/artyomtrus/russian-travel"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
          <span className="portfolio__arrow"></span>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/artyomtrus/react-mesto-api-full"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <span className="portfolio__arrow"></span>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
