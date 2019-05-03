import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';
import styled from 'styled-components';

const ChartWrapper = styled.div`
    width: 70%;
`;

class Chart extends Component {
    
    calculateData = event => {
        let entriesLength = this.props.foodEntries.length
        let meats = this.props.foodEntries.filter(food => food.categoryId===4)
        let veg = this.props.foodEntries.filter(food => food.categoryId===2)
        let fruit = this.props.foodEntries.filter(food => food.categoryId===1)
        let dairy = this.props.foodEntries.filter(food => food.categoryId===5)
        return [
            (meats.length/entriesLength*100).toFixed(2),
            (veg.length/entriesLength*100).toFixed(2),
            (fruit.length/entriesLength*100).toFixed(2),
            (dairy.length/entriesLength*100).toFixed(2)
        ]
        
    }
    
    render() {
        return (
            <ChartWrapper>
                <Pie
                    redraw = {true}
                    data={{
                        labels: ['Meat', 'Vegetables', 'Fruit', 'Dairy'],
                        datasets: [{
                            data: this.calculateData(), 
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
                            text:'Food Eaten in last 24 Hrs',
                            fontColor: 'white'
                        },
                        legend: {
                            display: true,
                            labels : {
                                fontColor: 'white'
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