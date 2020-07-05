import React from "react";
import Home from "./components/Home/Home";
import Appointments from "./components/Appointments/Appointments";

import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route history={history} path="/home" component={Home} />
          <Route
            history={history}
            path="/appointments"
            component={Appointments}
          />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default App;
