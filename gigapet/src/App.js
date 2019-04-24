import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  console.log(props.parents);
  return (
    <div className="App">
      <p>Filler</p>
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
