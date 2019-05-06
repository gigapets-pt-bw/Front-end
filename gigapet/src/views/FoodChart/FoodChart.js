import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';
import styled from 'styled-components';

const ChartWrapper = styled.div`
    width: 70%;
    @media screen and (max-width: 900px) {
        width: 80%;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: 100%;
    }
`;

const RadioButtons = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

class Chart extends Component {

    state = {
        dayWeekMonth: 'day'
    }
    
    // Function for filtering our food entries based on day/week/month
    filterDate = event => {
        const today = new Date().toISOString().split('')
        switch(this.state.dayWeekMonth) {
            case("day"):
                return this.props.foodEntries.filter(entry =>
                    entry.entryDate.split('')[5]+
                    entry.entryDate.split('')[6]+
                    entry.entryDate.split('')[7]+
                    entry.entryDate.split('')[8]+
                    entry.entryDate.split('')[9] === today[5]+today[6]+today[7]+today[8]+today[9]
                )
            case("week"):
                return this.props.foodEntries.filter(entry => {
                    let rangeEnd = parseInt(today[8]+today[9], 10)
                    let entryDate = parseInt(entry.entryDate.split('')[8]+entry.entryDate.split('')[9], 10)
                    let month = parseInt(entry.entryDate.split('')[5]+entry.entryDate.split('')[6], 10)
                    console.log(rangeEnd, entryDate);
                    for(let i=1; i<=7; i++, rangeEnd--) {
                        console.log(rangeEnd);
                        if(rangeEnd===1) {
                            rangeEnd=31
                        }
                        if (entryDate===rangeEnd) {
                            if(month===parseInt(today[5]+today[6],10)){
                                return entry
                            }
                        }
                    }
                    return console.log('Thrown out');
                })
            case("month"):
                return this.props.foodEntries.filter(entry => 
                    parseInt(today[6], 10) - parseInt(entry.entryDate.split('')[6], 10) < 2
                )
            default:
                return this.props.foodEntries
        }
    }

    //This function calculates our percentages of food eaten per category
    calculateData = (foods) => {
        if (foods.length===0) {
            return [1, 1, 1, 1]
        }
        let entriesLength = foods.length
        let meats = foods.filter(food => food.categoryId===4)
        let veg = foods.filter(food => food.categoryId===2)
        let fruit = foods.filter(food => food.categoryId===1)
        let dairy = foods.filter(food => food.categoryId===5)
        return [
            (meats.length/entriesLength*100).toFixed(2),
            (veg.length/entriesLength*100).toFixed(2),
            (fruit.length/entriesLength*100).toFixed(2),
            (dairy.length/entriesLength*100).toFixed(2)
        ]
        
    }
    
    inputChange = event => {
        this.setState({ dayWeekMonth: event.target.value })
    }
    
    render() {
        const datedFoods = this.filterDate();
        return (
                <ChartWrapper>
                    <RadioButtons className="change-chart">
                        <div className="radio-button">
                            <input onChange={this.inputChange} type="radio" id="day" name="time" value="day"/>
                            <label for="day">Day</label>
                        </div>
                        <div className="radio-button">
                            <input onChange={this.inputChange} type="radio" id="week" name="time" value="week"/>
                            <label for="week">Week</label>
                        </div>
                        <div className="radio-button">
                            <input onChange={this.inputChange} type="radio" id="month" name="time" value="month"/>
                            <label for="month">Month</label>
                        </div>
                    </RadioButtons>
                    <Pie
                        redraw = {true}
                        data={{
                            labels: ['Meat', 'Vegetables', 'Fruit', 'Dairy'],
                            datasets: [{
                                //We call our calculateData function with our filtered foods based on date
                                data: this.calculateData(datedFoods), 
                                backgroundColor: [
                                    '#EA526F',
                                    '#8AC926',
                                    '#00A6FB',
                                    '#FFCA3A'
                                ]
                        }]
                        }}
                        options={{
                            title: {
                                display: true,
                                text:`Food Eaten in the last ${this.state.dayWeekMonth}`,
                                fontColor: 'white',
                            },
                            legend: {
                                display: true,
                                labels : {
                                    fontColor: 'white',
                                }
                            }
                        }}  
                    />
            </ChartWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        foodEntries : state.foodEntries
    }
}

export default connect(mapStateToProps, {})(Chart);