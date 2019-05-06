import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const FoodCardStyle = styled.button`
background: #D0EEFE;
border-radius: 5px;
width: 40%;
margin: 5px 2px;
cursor: pointer;
font-family: "Capriola", sans serif;
font-size: 1rem;
height: 3.125rem;
font-weight: bold;
@media screen and (max-width: 900px) {
    width: 47.5%;
    font-size: 0.7rem;
}
&:hover {
    transition: 0.2s;
    translation: scaley(1.05);
    background: #8BD6FD;
}
`;

function FoodEntry (props) {
    //clickHelper is a helper function that can pass up data for creating new food entry
    return (
        <FoodCardStyle onClick={() => { props.clickHelper(props.food, props.childId)}}>
                {props.food.name}
        </FoodCardStyle>
    )
}

const mapStateToProps = state => {
    return {
        childId : state.currentChild.id
    };
}

export default connect(mapStateToProps, { })(FoodEntry);