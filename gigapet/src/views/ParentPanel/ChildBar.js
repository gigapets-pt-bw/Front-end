import React from 'react';
import { currentChild, fetchFoodEntries } from '../../actions';
import { connect } from 'react-redux';
import styled from 'styled-components';


const ChildBarStyle = styled.div`
    border: 0.5px solid black;
    display: flex;
    flex-wrap: no-wrap;
    justify-content: space-between;
    padding: 0 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: white;
    opacity: 0.80;

    div {
        p {
            cursor: pointer;
        }
        p:hover {
            transition: 0.25s;
            transform: translateY(-4px);
        }
    }

    .view-child {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 30px;
        align-items: center;
        i {
            font-size: 22.5px;
            color: #EA526F;
            margin-right: 10px;
        }
        p {
            padding-bottom: 2px;
            font-weight: bold;
        }
    }
    .status {
        font-family: "Capriola", sans serif;
        font-weight: bolder;
    }
    &:hover {
        transition: 0.5s;
        opacity: 1.0;
    }
`;

const ChildBar = props => {
    function fetchEntries(currentChild) {
        props.fetchFoodEntries(currentChild.id);
    }
    return (
        <>
            <ChildBarStyle>
                <p className="status">{`${props.name}'s  Gigapet - ${props.gigapetName}`}</p>
                <div onClick={() => { 
                    props.currentChild(fetchEntries, props.children.filter(child => child.name === props.name), //need to pass props.id
                    props.redirect()
                    )}} className="view-child">
                    <i className="fas fa-eye"></i>
                    <p>View</p>
                </div>
            </ChildBarStyle>
        </>
    );
}


const mapStateToProps = state => {
    return {
        children: state.children,
        currentChild: state.currentChild
    }
}

export default connect(mapStateToProps, { currentChild, fetchFoodEntries })(ChildBar);