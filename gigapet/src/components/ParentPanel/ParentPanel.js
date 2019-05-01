import React, { Component } from "react";
import styled from "styled-components";
import ChildBar from '../../views/ParentPanel/ChildBar';
import { connect } from "react-redux";
import { createChild } from "../../actions";

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
  &:hover {
    opacity: 0.975;
    transition: 0.25s;
  }
  .user-panel {
    padding: 2% 1%;
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
`;

const ChildForm = styled.form`
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
`;

class ParentPanel extends Component {
  state = {
    name: "",
    gigapet: "",
    newChild: false
  };

  inputHandler = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  createChild = event => {
    event.preventDefault();
    let newChild = {
      name : this.state.name,
      gigapetName : this.state.gigapet
    }
    this.props.createChild(newChild, this.props.user.id);
    this.setState({
      name: "", 
      gigapet: "",
      newChild: false
    })
  }

  createChildButton = event => {
    event.preventDefault();
    this.setState({newChild: true});
  }

  backButton = event => {
    event.preventDefault();
    this.setState({newChild: false});
  }

  render() {

    let newChildForm = 
      <ChildForm>
        <form onSubmit={this.createChild}>
            <div className="column">
              <h2>Name:</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
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
            {/*this.props.children.map(child => { 
              <ChildBar name={child.name} gigapetName={child.gigapetName} />
              }*/}
            <ChildBar name='Johnny' gigapetName='Dino Dan' />
            <ChildBar name='Johnny2' gigapetName='Dino Dan2' />
            <ChildBar name='Johnny3' gigapetName='Dino Dan3' />
            <ChildBar name='Johnny4' gigapetName='Dino Dan4' />
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
  { createChild }
)(ParentPanel);

