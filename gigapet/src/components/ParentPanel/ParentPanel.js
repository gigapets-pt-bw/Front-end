import React, { Component } from "react";
import styled from "styled-components";
import ChildBar from '../../views/ParentPanel/ChildBar';
import { connect } from "react-redux";
import { createChild, fetchChildren } from "../../actions";

const Panel = styled.div`
  border: 1px solid black;
  width: 70vw;
  margin: 0 auto;
  display: flex;
  min-height: 370px;
  justify-content: space-around;
  background-image: linear-gradient(#003D5C, #5CC6FC);
  border-radius: 10px;
  opacity: 0.925;
  padding-top: 20px;
  @media screen and (max-width: 900px) {
    width: 90vw;
    height: 92.5vh;
    opacity: 0.975;
  }
  &:hover {
    opacity: 0.975;
    transition: 0.25s;
  }
  .user-panel {
    padding: 3% 1% 3% 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 24%;
    .person {
      width: 50px;
      height: 50px;
    }
    h2 {
      font-family: "Londrina Shadow", cursive;
      font-weight: bolder;
      font-size: 32px;
      color: white;
      text-shadow: 1px 1px black;
      width: 100%;
    }
  }
  .child-panel {
    width: 74%;
    padding: 2.5% 2.5% 2.5% 0;
    .new-child {
      font-family: "Capriola", sans serif;
      border: 1px solid black;
      width: 100%;
      height: 60px;
      margin: 10px 0;
      font-weight: bolder;
      border-radius: 5px;
      font-size: 22px;
      letter-spacing: 2px;
      @media screen and (max-width: 900px) {
        font-size: 16px;
      }
      i {
        color: #EA526F;
        margin-right: 10px;
      }
      &:hover {
        background-color: darkgray;
        transition: 0.5s;
      }
    }
  }
  img {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 900px) {
    .user-panel {
      padding: 5% 2.5% 5% 2.5%;
      width: 35%;
    }
  }
`;

const ChildForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2.5%;
  
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 95%;
    .column {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-family: "Capriola", cursive;
        font-size: 28px;
        color: white;
        width: 100%;
        text-shadow: 1px 1px black;
      }
      
      button {
        width: 100%;
        font-family: "Capriola", sans serif;
        border: 1px solid black;
        height: 60px;
        margin: 10px 0;
        font-weight: bolder;
        border-radius: 5px;
        font-size: 22px;
        letter-spacing: 2px;
        cursor: pointer;
        &:hover {
          transition: 0.25s;
          transform: translateY(-4px);
          box-shadow: 0px 2px 4px 0 white;
          background-color: grey;
        }
      }
      
      input {
        width: 98%;
        padding-left: 1%;
        border-radius: 5px;
        height: 30px;
      }
    }
  }

  @media screen and (max-width: 900px) {
    form {
      width: 95%;
      display: flex;
      align-items: flex-end;
    }
  }
`;

class ParentPanel extends Component {
  state = {
    //Strings to hold controlled input values
    name: "",
    gigapet: "",
    //Boolean to toggle form for creating child/gigapet
    newChild: false
  };

  inputHandler = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  //Callback functions to regulate action creator firing/app flow
  fetch = event => {
    this.props.fetchChildren(this.props.user.id);
  }
  gigaLink = event => {
    this.props.history.push('/home/giga');
  }

  //Function for setting up object to be passed into action creator for POST request to make new child
  createChild = event => {
    event.preventDefault();
    let newChild = {
      name : this.state.name,
      gigapetName : this.state.gigapet,
      parentId : this.props.user.id
    }
    this.props.createChild(newChild, this.fetch);
    this.setState({
      name: "", 
      gigapet: "",
      newChild: false
    })
  }

  //Toggles bool in state so form will appear/dissapear for creating child/gigapet
  createChildButton = event => {
    event.preventDefault();
    this.setState({newChild: true});
  }
  backButton = event => {
    event.preventDefault();
    this.setState({newChild: false});
  }

  render() {
    //Instantiating a variable that holds JSX so we can perform ternary to manipulate the view
    let newChildForm = 
      <ChildForm>
        <form onSubmit={this.createChild}>
            <div className="column">
              <h2>Child Name:</h2>
              <input
                type="text"
                name="name"
                placeholder="Child Name"
                onChange={this.inputHandler}
                value={this.state.name}
              />
              <button onClick={this.backButton}>Back</button>
            </div>
            <div className="column">
              <h2>Gigapet Name:</h2>
              <input
                type="text"
                name="gigapet"
                placeholder="Gigapet Name"
                onChange={this.inputHandler}
                value={this.state.gigapet}
              />
            <button>Create Child</button>
            </div>
        </form>
      </ChildForm>

    let newChildButton = <button className="new-child" onClick={this.createChildButton}><i className="fas fa-plus-circle"></i>Create New Child</button>

    return (
        <Panel>
          <div className="user-panel">
            <div>
              <img className="person" src="https://svgsilh.com/svg_v2/23874.svg" alt="generic person logo"></img>
              <h2>{`${localStorage.getItem("username")}'s Console`}</h2>
            </div>
            <img className="animal" src="http://clipart-library.com/new_gallery/panda-clipart-11.png" alt="generic panda logo"></img>
          </div>
          <div className="child-panel">
            {this.state.newChild ? newChildForm : newChildButton}
            {this.props.children.map(child => 
              <ChildBar redirect={this.gigaLink} name={child.name} gigapetName={child.gigapetName}/>
            )}
          </div>
        </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.user,
    children: state.children
  }
}

export default connect(
  mapStateToProps,
  { createChild, fetchChildren }
)(ParentPanel);

