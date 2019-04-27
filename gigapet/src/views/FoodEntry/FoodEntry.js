import React from 'react';
import styled from 'styled-components';

const FoodCardStyle = styled.div`
background: #D0EEFE;
border-radius: 5px;
width: 40%;
margin: 5px 2px;
cursor: pointer;
&:hover {
    transition: 0.2s;
    translation: scaley(1.05);
    background: #8BD6FD;
}
p {
    font-weight: bolder;
}
`;

function FoodEntry (props) {
    return (
        <FoodCardStyle>
            <div onClick={() => { props.clickHelper(props.food.category)}}  className="food-card">
                <p>{props.food.name}</p>
            </div>
        </FoodCardStyle>
    )
}

export default FoodEntry;