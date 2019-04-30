import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import styled from 'styled-components';

const ChartWrapper = styled.div`
    width: 70%;
`;

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Meat', 'Dairy', 'Vegetables', 'Fruit'],
                datasets: [{
                    data: [25, 25, 25, 25], 
                    backgroundColor: [
                        '#EA526F',
                        '#FFCA3A',
                        '#8AC926',
                        '#00A6FB'
                    ]
            }]
            }
        }
    }

    render() {
        return (
            <ChartWrapper>
                <Pie
                    data={this.state.chartData}
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

export default Chart;