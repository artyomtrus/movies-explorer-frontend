import "./Footer.css";
import { Route, Switch } from "react-router-dom";

function Footer() {
  return (
    <>
      <Switch>
        <Route exact path={["/movies", "/saved-movies", "/"]}>
          <footer className="footer">
            <h2 className="footer__title">
              Учебный проект Яндекс.Практикум х BeatFilm.
            </h2>
            <div className="footer__nav">
              <p className="footer__year">© 2022</p>
              <ul className="footer__links">
                <li>
                  <a
                    href="https://practicum.yandex.ru/"
                    className="footer__link"
                  >
                    Яндекс.Практикум
                  </a>
                </li>
                <li>
                  <a href="https://github.com/" className="footer__link">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </Route>
        <Route exact path={["/signup", "/signin"]}></Route>
      </Switch>
    </>
  );
}

export default Footer;
