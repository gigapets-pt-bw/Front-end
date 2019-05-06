import React, {Component} from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import { Route } from "react-router-dom";
import ParentPanel from "./components/ParentPanel/ParentPanel";
import PrivateRoute from "./components/Login/PrivateRoute";
import GigaPetPanel from "./components/GigaPetPanel/GigaPetPanel";


// We have our Login route unprotected, but other panels are through protected routes
class App extends Component {
  render(){
    return (
        <div className="App">
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home/giga" component={GigaPetPanel} />
          <PrivateRoute exact path="/home" component={ParentPanel} />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    parents: state.parents
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);
