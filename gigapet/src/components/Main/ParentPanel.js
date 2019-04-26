import React, { Component } from "react";
import styled from "styled-components";
import ChildBar from '../../views/ParentPanel/ChildBar';
import { connect } from "react-redux";

const Panel = styled.div`
  border: 1px solid black;
  width: 75%;
  height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: #00A6FB;
  border-radius: 10px;
  align-content: center;
  .user-panel {
    padding: 2% 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 19%;
    .person {
      width: 50px;
      height: 50px;
    }
    h2 {
      width: 100%;
    }
  }
  .child-panel {
    width: 79%;
    button {
      border: 1px solid black;
      width: 100%;
      height: 60px;
      margin: 10px 0;
      font-weight: bolder;
      border-radius: 5px;
      font-size: 18px;
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
`;

class ParentPanel extends Component {

  render() {
    return (
      <Panel>
        <div className="user-panel">
          <div>
            <img className="person" src="https://svgsilh.com/svg_v2/23874.svg"></img>
            <h2>{`${this.props.user.username}'\s Console`}</h2>
          </div>
          <img className="animal" src="http://clipart-library.com/new_gallery/panda-clipart-11.png"></img>
        </div>
        <div className="child-panel">
          <button><i class="fas fa-plus-circle"></i>Create New Child</button>
          <ChildBar name='Johnny' petname='Dino Dan' />
          <ChildBar name='Johnny2' petname='Dino Dan2' />
          <ChildBar name='Johnny3' petname='Dino Dan3' />
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

