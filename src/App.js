import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";
import Home from "./components/Home";
import "./styles/index.css"
import EmptyForm from "./components/EmptyForm";

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
    <Router history={history}>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute path ="/profile" component={Profile}/>
        <PrivateRoute path="/form-builder" component={EmptyForm}/>
        <PrivateRoute path ="/external-api" component={ExternalApi}/>
      </Switch>
    </Router>
    </div>
  );
}
