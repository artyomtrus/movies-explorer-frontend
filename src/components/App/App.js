import "./App.css";
import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [userData, setUserData] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [profileError, setProfileError] = React.useState("");

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUser()
        .then((userInfo) => {
          setCurrentUser(userInfo.data);
          localStorage.setItem("checkbox", false);
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi.getSavedMovies().then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      });
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUser()
        .then((res) => {
          setUserData(res.data);
          handleLogin();
          history.push(pathname);
        })
        .catch((err) => console.log(err));
    }
  }

  function goBack() {
    history.goBack();
  }

  function handleRegistration(email, password, name) {
    mainApi
      .registration(email, password, name)
      .then(() => {
        mainApi.login(email, password).then((data) => {
          if (data.token) {
            setUserData(email);
            handleLogin();
            localStorage.setItem("token", data.token);
            history.push("/movies");
          }
        });
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setRegisterError("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setRegisterError("Переданы некорректные данные");
        } else {
          setRegisterError("Произошла ошибка");
        }
      });
  }

  function handleAuthorize(email, password) {
    if (!email || !password) {
      return;
    }
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setUserData(email);
          handleLogin();
          localStorage.setItem("token", data.token);
          history.push("/movies");
        }
      })
      .catch(() => {
        setLoginError("Неправильные почта или пароль");
      });
  }

  function handleEditUser(data) {
    mainApi
      .editUser(data)
      .then((user) => {
        setCurrentUser(user.data);
        setProfileError("Отредактировано");
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setProfileError("Этот email занят другим пользователем");
        } else if (err === "Ошибка: 400") {
          setProfileError("Проверьте правильность введенных данных");
        }
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setFilterMovies([]);
    history.push("/");
  }

  function getMovies(name) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
          localStorage.setItem("allMovies", JSON.stringify(data));
          handleGetMovies(name, data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      handleGetMovies(name, allMovies);
    }
  }

  function handleGetMovies(name, data) {
    let checkboxStatus = localStorage.getItem("checkbox");
    if (checkboxStatus === "true") {
      let filterMovies = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(name.toLowerCase())
      );
      let shortsMovies = filterMovies.filter((movie) => movie.duration <= 40);
      localStorage.setItem("filterMovies", JSON.stringify(shortsMovies));
      setFilterMovies(shortsMovies);
      shortsMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    } else {
      let filterMovies = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(name.toLowerCase())
      );
      localStorage.setItem("filterMovies", JSON.stringify(filterMovies));
      setFilterMovies(filterMovies);
      filterMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    }
  }

  function handleGetSaveMovies(name) {
    let checkboxStatus = localStorage.getItem("checkbox");
    if (checkboxStatus === "true") {
      let filterSavedMovies = savedMovies.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(name.toLowerCase())
      );
      let shortsFilterSavedMovies = filterSavedMovies.filter(
        (movie) => movie.duration <= 40
      );
      localStorage.setItem(
        "filterSavedMovies",
        JSON.stringify(shortsFilterSavedMovies)
      );
      setFilterSavedMovies(shortsFilterSavedMovies);
      shortsFilterSavedMovies.length === 0
        ? setIsNotFound(true)
        : setIsNotFound(false);
    } else {
      let filterSavedMovies = savedMovies.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(name.toLowerCase())
      );
      localStorage.setItem(
        "filterSavedMovies",
        JSON.stringify(filterSavedMovies)
      );
      setFilterSavedMovies(filterSavedMovies);
      filterSavedMovies.length === 0
        ? setIsNotFound(true)
        : setIsNotFound(false);
    }
  }

  function handleSavedMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        const newSavedMovie = [...savedMovies, newMovie.data];
        setSavedMovies(newSavedMovie);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovie));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const saveFilm = savedMovies.find(
      (i) =>
        i.movieId === (pathname === "/saved-movies" ? movie.movieId : movie.id)
    );
    if (pathname === "/movies") {
      mainApi.deleteMovie(saveFilm).then(() => {
        mainApi
          .getSavedMovies()
          .then((res) => {
            setSavedMovies(res);
            localStorage.setItem("savedMovies", JSON.stringify(res));
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      mainApi.deleteMovie(movie).then(() => {
        mainApi.getSavedMovies().then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        });
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="container">
          <Header loggedIn={loggedIn} userData={userData} />
          <Switch>
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              userData={userData}
              onSignOut={handleSignOut}
              onSubmit={handleEditUser}
              profileError={profileError}
            />
            <ProtectedRoute
              exaxt
              path="/movies"
              movies={filterMovies}
              loggedIn={loggedIn}
              component={Movies}
              isLoading={isLoading}
              savedMovies={savedMovies}
              getMovies={getMovies}
              handleSavedMovie={handleSavedMovie}
              handleDeleteMovie={handleDeleteMovie}
              isNotFound={isNotFound}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              movies={savedMovies}
              filterSavedMovies={filterSavedMovies}
              savedMovies={savedMovies}
              getMovies={handleGetSaveMovies}
              handleSavedMovie={handleSavedMovie}
              handleDeleteMovie={handleDeleteMovie}
              isNotFound={isNotFound}
            />
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/movies">
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="signin" />}
            </Route>
            <Route exact path="/signin">
              <Login
                handleAuthorize={handleAuthorize}
                loginError={loginError}
              />
            </Route>
            <Route exact path="/signup">
              <Register
                handleRegistration={handleRegistration}
                registerError={registerError}
              />
            </Route>
            <Route path="*">
              <NotFoundPage goBack={goBack} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
