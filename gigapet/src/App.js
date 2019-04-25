import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import { Route } from "react-router-dom";
import ParentPanel from "./components/Main/ParentPanel";

function App(props) {
  console.log(props.parents);
  return (
    <div className="App">
      <Route path="/home" component={ParentPanel} />
      <Route exact path="/" render={props => <Login {...props} />} />
    </div>
  );
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
