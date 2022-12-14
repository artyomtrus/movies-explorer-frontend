import "./NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage(props) {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link className="not-found__link" onClick={props.goBack}>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
