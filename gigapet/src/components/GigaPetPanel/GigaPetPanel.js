import React, {Component} from 'react';
import FoodEntry from '../../views/FoodEntry/FoodEntry';
import Chart from '../../views/FoodChart/FoodChart';
import styled from 'styled-components';

const mockFoodEntries = 
[ 
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'banana',
    category: 'fruit',
    value: 1
  },
  {
    name: 'apple',
    category: 'fruit',
    value: 1
  },
  {
    name: 'orange',
    category: 'fruit',
    value: 1
  },
  {
    name: 'celery',
    category: 'vegetable',
    value: 1
  },
  {
    name: 'steak',
    category: 'meat',
    value: 1
  },
  {
    name: 'chicken',
    category: 'meat',
    value: 1
  },
  {
    name: 'milk',
    category: 'dairy',
    value: 1
  },
  {
    name: 'yogurt',
    category: 'dairy',
    value: 1
  }
]

const GigapetContainerStyle = styled.div`
width: 70%;
border: 2px solid black;
height: 90%;
margin: 0 auto;
opacity: 0.925;
border-radius: 5px;
&:hover {
    transition: 0.25s;
    opacity: 0.975;
}
.panel-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    background-image: linear-gradient(#003D5C, #5CC6FC);
    .gigafood-panel{
        border: 1px solid black;
        border-right: 2px solid black;
        width: 35%;
        // form {
        //     display: flex;
        //     flex-direction: column;
        //     padding: 5px;
        //     display: flex;
        //     width: 80%;
        //     margin: 0 auto;
        //     input {
        //         font-family: 'Capriola', sans-serif;
        //         height: 1.875rem;
        //         margin: 5px 0;
        //     }
        //     select {
        //         font-family: 'Capriola', sans-serif;
        //         font-weight: bold;
        //         margin: 5px 0;
        //         height: 1.875rem;
        //     }
        //     .button-container {
        //         display: flex;
        //         flex-direction: row;
        //         justify-content: space-evenly;
        //         .add {
        //             font-family: 'Capriola', sans-serif;
        //             font-weight: bolder;
        //             margin: 5px;
        //             width: 100px;
        //             height: 40px;
        //             border-radius: 5px;
        //             background: #8AC926;
        //             cursor: pointer;
        //             &:hover {
        //                 background: #65931C;
        //             }
        //         }
        //         .remove {
        //             font-family: 'Capriola', sans-serif;
        //             font-weight: bolder;
        //             margin: 5px;
        //             width: 100px;
        //             height: 40px;
        //             border-radius: 5px;
        //             background: #ED7189;
        //             cursor: pointer;
        //             &:hover {
        //                 background: #C0445B;
        //             }
        //         }
        //     }
        // }
        .food-inventory {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding-top: 0.5rem;
        }
        .food-categories{
            border-top: 2px solid black;
            border-bottom: 2px solid black;
            display: flex;
            justify-content: space-evenly;
            img {
                width: 64px;
                height: 64px;
                padding: 10px 2px 10px 4px;
                opacity: 0.75;
                cursor: pointer;
            }
            .active {
                transition: 0.25s;
                opacity: 1.0;
                transform: translateY(-5px);
            }
        }
    }
    .gigapet-status-panel{
        display: flex;
        width: 65%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-left: 0;
        h2 {
            font-family: "Londrina Shadow", cursive;
            letter-spacing: 2px;
            color: white;
            font-size: 28px;
            font-weight: bolder;
            text-shadow: 1px 1px black;
        }
        img {
            margin: 2% 0;
            height: 130px;
            width: 120px;
        }
        .food-eaten {
            img {
                padding: 1rem;
                width: 32px;
                height: 32px;
                border-radius: 10px;
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

// const mockDataGigapet = {
//     name : '',
//     health : 10,
// }

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
        let filteredFoods = mockFoodEntries.filter((food) => food.category===this.state.displayFood );
        return (
            <GigapetContainerStyle>
                <div className="panel-container">
                    <div className="gigafood-panel">
                        {/* <form>
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

                        </form> */}
                        <div className="food-categories">
                            {this.state.displayFood==="vegetable" ? <img className="active" onClick={() => { this.switchHandler('vegetable')}} src={process.env.PUBLIC_URL + '/vegetable.png'} alt="veg" /> : <img onClick={() => { this.switchHandler('vegetable')}} src={process.env.PUBLIC_URL + '/vegetable.png'} alt="veg" />}
                            {this.state.displayFood==="meat" ? <img className="active" onClick={() => { this.switchHandler('meat')}} src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" /> : <img onClick={() => { this.switchHandler('meat')}} src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" />}
                            {this.state.displayFood==="fruit" ? <img className="active" onClick={() => { this.switchHandler('fruit')}} src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" /> : <img onClick={() => { this.switchHandler('fruit')}} src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" />}
                            {this.state.displayFood==="dairy" ? <img className="active" onClick={() => { this.switchHandler('dairy')}} src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" /> : <img onClick={() => { this.switchHandler('dairy')}} src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" />}
                        </div>
                        <div className="food-inventory">
                            {filteredFoods.map(food => <FoodEntry food={food} clickHelper={this.foodHandler} />)}
                        </div>
                    </div>

                    <div className="gigapet-status-panel">
                        <h2>{`Kung Fu Panda, the ${this.state.hungry ? 'hungry' : 'not-so-hungry & sleepy'} Panda`}</h2>
                        <img src={this.state.hungry ? "https://ui-ex.com/images/panda-transparent-hungry-5.png" : "https://ui-ex.com/images/panda-transparent-sleeping-1.png"} alt="Panda"></img>
                        <div className="food-eaten">
                            {!this.state.hasEatenVegetable ? <img src={process.env.PUBLIC_URL + '/vegetable.png'} alt="vegetable" className="not-eaten"/> : <img src={process.env.PUBLIC_URL + '/vegetable.png'} alt="vegetable" className="eaten"/>}
                            {!this.state.hasEatenMeat ? <img src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" className="not-eaten"/> : <img src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" className="eaten"/>}
                            {!this.state.hasEatenFruit ? <img src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" className="not-eaten"/> : <img src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" className="eaten"/>}
                            {!this.state.hasEatenDairy ? <img src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" className="not-eaten"/> : <img src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" className="eaten"/>}
                        </div>
                        <Chart
                        />
                    </div>
                </div>
           </GigapetContainerStyle>
        )
    }
}

export default GigaPetPanel;