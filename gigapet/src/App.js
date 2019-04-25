import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";

function App(props) {
  console.log(props.parents);
  return (
    <div className="App">
      <Login />
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
