import React, {Component} from 'react';
import FoodEntry from '../../views/FoodEntry/FoodEntry';
import styled from 'styled-components';
// import App from '../../views/FoodChart/FoodChart';

const GigapetContainerStyle = styled.div`
border: 1px solid black;
width: 50%;
height: 500px;
margin: 0 auto;
.panel-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    background-image: linear-gradient(#003D5C, #5CC6FC);
    .gigafood-panel{
        border: 1px solid black;
        border-right: 2px solid black;
        width: 30%;
        form {
            display: flex;
            flex-direction: column;
            padding: 5px;
            display: flex;
            width: 80%;
            margin: 0 auto;
            input {
                margin: 5px 0;
            }
            select {
                margin: 5px 0;
            }
            .button-container {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                .add {
                    margin: 5px;
                    width: 100px;
                    height: 40px;
                    border-radius: 5px;
                    background: #8AC926;
                    &:hover {
                        background: #65931C;
                    }
                }
                .remove {
                    margin: 5px;
                    width: 100px;
                    height: 40px;
                    border-radius: 5px;
                    background: #ED7189;
                    &:hover {
                        background: #C0445B;
                    }
                }
            }
        }
        .food-inventory {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding-top: 0.5rem;
        }
        .food-categories{
            border-top: 2px solid black;
            border-bottom: 2px solid black;
            padding: 10px 2px 10px 4px;
            display: flex;
            justify-content: space-between;
            i {
                cursor: pointer;
                font-size: 32px;
            }
        }
    }
    .gigapet-status-panel{
        display: flex;
        width: 70%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-left: 0;
        img {
            margin: 5% 0;
            height: 170px;
            width: 150px;
        }
        .food-eaten {
            i {
                font-size: 32px;
                padding: 15px;
            }
            width: 50%;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            .not-eaten {
                background-color: #953547;
            }
            .eaten { 
                background-color: #8AC926;
            }
        }
    }
}
`;

const mockDataGigapet = {
    name : '',
    health : 10,
}

class GigaPetPanel extends Component {
    state = {
        newFood : "",
        displayFood : "",
        hasEatenMeat : false,
        hasEatenFruit : false,
        hasEatenDairy : false,
        hasEatenVegetable : false,
        hungry : true,
    }

    switchHandler(food) {
        this.setState({ displayFood: food })
    }
    
    foodHandler = food => {
        switch(food) {
            case('fruit'):
                if (this.state.hasEatenMeat && this.state.hasEatenDairy && this.state.hasEatenVegetable) {
                    this.setState({ displayFood: food, hungry : false })
                }
                this.setState({ hasEatenFruit : true });
                break;
            case('meat'):
                if (this.state.hasEatenDairy && this.state.hasEatenVegetable && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food, hungry : false })
                }
                this.setState({ hasEatenMeat : true });
                break;
            case('vegetable'):
                if (this.state.hasEatenDairy && this.state.hasEatenMeat && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food, hungry : false })
                }
                this.setState({ hasEatenVegetable : true });
                break;
            case('dairy'):
                if (this.state.hasEatenMeat && this.state.hasEatenVegetable && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food, hungry : false })
                }
                this.setState({ hasEatenDairy : true });
                break;
            default:
                return null
        }
    }

    inputHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
      };

    // newFoodHandler = () => {
    //     this.setState ({ newFood: '' })
    // }
    
    render(){
        let filteredFoods = this.props.foodentries.filter((food) => food.category===this.state.displayFood );
        return (
            <GigapetContainerStyle>
                <div className="panel-container">
                    <div className="gigafood-panel">
                        <form>
                            <input
                                name="newFood"
                                placeholder="Enter new food item"
                                value={this.state.newFood}
                                onChange={this.inputHandler}
                                /> 
                            <select>
                                <option value="Fruit">Fruit</option>
                                <option value="Meat">Meat</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Vegetable">Vegetable</option>
                            </select>
                            <div className="button-container">
                                <button className="add"> Add </button>
                                <button className="remove"> Remove </button>
                            </div>

                        </form>
                        <div className="food-categories">
                            <i onClick={() => { this.switchHandler('meat')}} className="fas fa-drumstick-bite"></i>
                            <i onClick={() => { this.switchHandler('vegetable')}} className="fas fa-carrot"></i>
                            <i onClick={() => { this.switchHandler('fruit')}} className="fas fa-apple-alt"></i>
                            <i onClick={() => { this.switchHandler('dairy')}} className="fas fa-ice-cream"></i>
                        </div>
                        <div className="food-inventory">
                            {filteredFoods.map(food => <FoodEntry food={food} clickHelper={this.foodHandler} />)}
                        </div>
                    </div>

                    <div className="gigapet-status-panel">
                        <h2>{`Kung Fu Panda, the ${this.state.hungry ? 'hungry' : 'not-so-hungry & sleepy'} Panda`}</h2>
                        <img src={this.state.hungry ? "https://ui-ex.com/images/panda-transparent-hungry-5.png" : "https://ui-ex.com/images/panda-transparent-sleeping-1.png"} alt="Panda hungry"></img>
                        <div className="food-eaten">
                            {!this.state.hasEatenMeat ? <i className="fas fa-drumstick-bite not-eaten"></i> : <i className="fas fa-drumstick-bite eaten"></i>}
                            {!this.state.hasEatenVegetable ? <i className="fas fa-carrot not-eaten"></i> : <i className="fas fa-carrot eaten"></i> }
                            {!this.state.hasEatenFruit ? <i className="fas fa-apple-alt not-eaten"></i> : <i className="fas fa-apple-alt eaten"></i> }
                            {!this.state.hasEatenDairy? <i className="fas fa-ice-cream not-eaten"></i> : <i className="fas fa-ice-cream eaten"></i> }
                        </div>
                        {/* <App /> */}
                    </div>
                </div>
           </GigapetContainerStyle>
        )
    }
}

export default GigaPetPanel;