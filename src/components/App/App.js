import "./App.css";
import React from "react";
import {
  // Redirect,
  Route,
  Routes,
  // useHistory,
  // withRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Main />
        <Routes>
          <Route exact path="/"></Route>
          <Route exact path="/movies"></Route>
          <Route exact path="/saved-movies"></Route>
          <Route exact path="/profile"></Route>
          <Route exact path="/signin"></Route>
          <Route exact path="/signup"></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
