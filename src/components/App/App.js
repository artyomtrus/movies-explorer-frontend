import "./App.css";
import React from "react";
import {
  // Redirect,
  Route,
  Switch,
  useHistory,
  // withRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";

function App() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <NotFoundPage goBack={goBack} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
