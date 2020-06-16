import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "./react-auth0-spa";
import ExternalApi from "./views/ExternalApi";

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
        <Route exact path="/"/>
        <PrivateRoute path ="/profile" component={Profile}/>
        <PrivateRoute path ="/external-api" component={ExternalApi}/>
      </Switch>
    </Router>
    </div>
  );
}
