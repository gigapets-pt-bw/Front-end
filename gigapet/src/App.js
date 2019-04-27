import React, {Component} from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import { Route } from "react-router-dom";
import ParentPanel from "./components/ParentPanel/ParentPanel";
import GigaPetPanel from "./components/GigaPetPanel/GigaPetPanel";

//mock food entries
const mockFoodEntries = 
[ 
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'celery',
    category: 'vegetable',
    value: 1
  },
  {
    name: 'steak',
    category: 'meat',
    value: 1
  },
  {
    name: 'chicken',
    category: 'meat',
    value: 1
  },
  {
    name: 'milk',
    category: 'dairy',
    value: 1
  },
  {
    name: 'yogurt',
    category: 'dairy',
    value: 1
  }
]

class App extends Component {
  render(){
    return (
      <div className="App">
        <Route exact path="/home" component={ParentPanel} />
    <Route path="/home/giga" render={props => <GigaPetPanel {...props} foodentries={mockFoodEntries}/> } />
        <Route exact path="/" render={props => <Login {...props} />} />
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
