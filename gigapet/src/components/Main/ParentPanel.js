import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Panel = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: grey;
  border-radius: 10px;
  align-content: center;
`;

class ParentPanel extends Component {
  render() {
    return (
      <Panel>
        <h2>Fillers</h2>
      </Panel>
    );
  }
}

export default connect(
  null,
  {}
)(ParentPanel);
