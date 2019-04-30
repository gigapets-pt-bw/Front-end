import React, { Component } from "react";
import styled from "styled-components";
import ChildBar from '../../views/ParentPanel/ChildBar';
import { connect } from "react-redux";

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
    padding: 2% 0;
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
    button {
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

class ParentPanel extends Component {

  render() {
    return (
        <Panel>
          <div className="user-panel">
            <div>
              <img className="person" src="https://svgsilh.com/svg_v2/23874.svg" alt="generic person logo"></img>
              <h2>{`${this.props.user.username}'s Console`}</h2>
            </div>
            <img className="animal" src="http://clipart-library.com/new_gallery/panda-clipart-11.png" alt="generic panda logo"></img>
          </div>
          <div className="child-panel">
            <button><i className="fas fa-plus-circle"></i>Create New Child</button>
            <ChildBar name='Johnny' petname='Dino Dan' />
            <ChildBar name='Johnny2' petname='Dino Dan2' />
            <ChildBar name='Johnny3' petname='Dino Dan3' />
            <ChildBar name='Johnny4' petname='Dino Dan4' />
          </div>
        </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

export default connect(
  mapStateToProps,
  {}
)(ParentPanel);

