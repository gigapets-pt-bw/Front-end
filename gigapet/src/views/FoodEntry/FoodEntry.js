import React from 'react';
import styled from 'styled-components';

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
&:hover {
    transition: 0.2s;
    translation: scaley(1.05);
    background: #8BD6FD;
}
`;

function FoodEntry (props) {
    return (
        <FoodCardStyle onClick={() => { props.clickHelper(props.food.category)}}>
                {props.food.name}
        </FoodCardStyle>
    )
}

export default FoodEntry;