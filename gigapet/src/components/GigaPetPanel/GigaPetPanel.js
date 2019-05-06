import React, {Component} from 'react';
import FoodEntry from '../../views/FoodEntry/FoodEntry';
import Chart from '../../views/FoodChart/FoodChart';
import styled from 'styled-components';
import axiosWithAuth from "../../axiosAuth";
import {addFoodEntry} from "../../actions";
import { connect } from 'react-redux';

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
@media screen and (max-width: 900px){
    height: 90vh;
    width: 90vw;
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
        .food-inventory {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding-top: 0.5rem;
        }
        .food-categories{
            border-bottom: 2px solid black;
            display: flex;
            justify-content: space-evenly;
            @media screen and (max-width: 900px){
                height: 80px;
                align-items: center;
            }
            img {
                width: 64px;
                height: 64px;
                padding: 10px 2px 10px 4px;
                opacity: 0.75;
                cursor: pointer;
                @media screen and (max-width: 1138px){
                    width: 48px;
                    height: 48px;
                }
                @media screen and (max-width: 900px) {
                    width: 32px;
                    height: 32px;
                    padding: 5px 0px;
                }
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
            @media screen and (max-width: 900px) {
                padding: 0px 2px;
            }
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
                @media screen and (max-width: 900px) {
                    width: 16px;
                    height: 16px;
                }
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

class GigaPetPanel extends Component {
    state = {
        //Foods array to fill inventory after CDM
        foods : [],
        //String to regulate food category tab
        displayFood : "",
        //Bools to figure out when GP is full
        hasEatenMeat : false,
        hasEatenFruit : false,
        hasEatenDairy : false,
        hasEatenVegetable : false,
        hungry : true,
        foodEntries: [],
    }

    componentDidMount = event => {
        //Fetching all food options
        axiosWithAuth().get('https://gigapets-pt-bw.herokuapp.com/api/foods').then(res => 
            this.setState({foods: res.data})
        )
        .catch(error => console.log(error));
    }

    //Function for handling switching between food category tabs
    switchHandler(food) {
        this.setState({ displayFood: food })
    }
    
    //Function for handling when a food is clicked, fires action creator for POST request for new
    //food entry and sets up our food entry object, our switch statement handles bools in state
    foodHandler = (food, id) => {
        let newEntry = {
            childId : id,
            foodId : food.id,
            date : new Date().toISOString()
        }
        this.setState({foodEntries:[...this.props.foodEntries, newEntry]});
        this.props.addFoodEntry(newEntry, id);
        switch(food.categoryId) {
            case(1):
                if (this.state.hasEatenMeat && this.state.hasEatenDairy && this.state.hasEatenVegetable) {
                    this.setState({ displayFood: food.categoryId, hungry : false })
                }
                this.setState({ hasEatenFruit : true });
                break;
            case(4):
                if (this.state.hasEatenDairy && this.state.hasEatenVegetable && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food.categoryId, hungry : false })
                }
                this.setState({ hasEatenMeat : true });
                break;
            case(2):
                if (this.state.hasEatenDairy && this.state.hasEatenMeat && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food.categoryId, hungry : false })
                }
                this.setState({ hasEatenVegetable : true });
                break;
            case(5):
                if (this.state.hasEatenMeat && this.state.hasEatenVegetable && this.state.hasEatenFruit) {
                    this.setState({ displayFood: food.categoryId, hungry : false })
                }
                this.setState({ hasEatenDairy : true });
                break;
            default:
                this.setState({ displayFood: food.categoryId })
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
        //We filter our foods here upon re-render based on food category tab clicked.
        let filteredFoods = this.state.foods.filter(food => food.categoryId === this.state.displayFood);
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
                            {this.state.displayFood===2 ? <img className="active" onClick={() => { this.switchHandler(2)}} src={process.env.PUBLIC_URL + '/vegetable.png'} alt="veg" /> : <img onClick={() => { this.switchHandler(2)}} src={process.env.PUBLIC_URL + '/vegetable.png'} alt="veg" />}
                            {this.state.displayFood===4 ? <img className="active" onClick={() => { this.switchHandler(4)}} src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" /> : <img onClick={() => { this.switchHandler(4)}} src={process.env.PUBLIC_URL + '/meat.png'} alt="meat" />}
                            {this.state.displayFood===1 ? <img className="active" onClick={() => { this.switchHandler(1)}} src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" /> : <img onClick={() => { this.switchHandler(1)}} src={process.env.PUBLIC_URL + '/fruit.png'} alt="fruit" />}
                            {this.state.displayFood===5 ? <img className="active" onClick={() => { this.switchHandler(5)}} src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" /> : <img onClick={() => { this.switchHandler(5)}} src={process.env.PUBLIC_URL + '/dairy.png'} alt="dairy" />}
                        </div>
                        <div className="food-inventory">
                            {filteredFoods.map(food => <FoodEntry food={food} clickHelper={this.foodHandler} />)}
                        </div>
                    </div>

                    <div className="gigapet-status-panel">
                        <h2>{`${this.props.currentChild.gigapetName}, the ${this.state.hungry ? 'hungry' : 'not-so-hungry & sleepy'} gigapet`}</h2>
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

const mapStateToProps = state => {
    return {
        currentChild: state.currentChild,
        foodEntries: state.foodEntries
    }
}
export default connect(mapStateToProps, { addFoodEntry })(GigaPetPanel);