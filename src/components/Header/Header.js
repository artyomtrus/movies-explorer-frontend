import "./Header.css";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const { pathname } = useLocation();

  return (
    <>
      <Switch>
        <Route exact path={["/movies", "/saved-movies", "/"]}>
          <header
            className={`header header_theme_${
              pathname === "/" ? "landing" : "main"
            }`}
          >
            <Link to="/" className="header__link">
              <img src={logo} alt="логотип" className="header__logo" />
            </Link>
            <Navigation />
          </header>
        </Route>
        <Route exact path={["/signup", "/signin"]}></Route>
      </Switch>
    </>
  );
}

export default Header;
