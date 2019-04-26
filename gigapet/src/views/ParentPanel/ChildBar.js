import React from 'react';
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
        font-weight: bolder;
    }
    &:hover {
        transition: 0.5s;
        opacity: 1.0;
    }
`;

const ChildBar = props => {
    return (
        <>
            <ChildBarStyle>
                <p className="status">{`${props.name}\'s  Gigapet  ${props.petname}`}</p>
                <div className="view-child">
                    <i className="fas fa-eye"></i>
                    <p>View</p>
                </div>
            </ChildBarStyle>
        </>
    );
}

export default ChildBar