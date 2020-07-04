import React from "react";
import Home from "./components/Home/Home";
import Appointments from "./components/Appointments/Appointments";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Appointments />
      </div>
    );
  }
}

export default App;
