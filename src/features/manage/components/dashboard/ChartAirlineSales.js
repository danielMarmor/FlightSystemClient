import React from 'react'
import { useSelector } from 'react-redux'
import { SelectAirlinesSales } from '../../manageSlice';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const colorPickers = ['#32a852', '#8cd49f', '#15291b', '#38523f', '#1bcf4b', '#08872a',
    '#9fc4a9', '#3c7a4d', '#b4ccba', '#26eb26'];

const ChartAirlineSales = () => {
    const sales = useSelector(SelectAirlinesSales);
    if (!sales) {
        return (<div></div>);
    }
    const labels = sales.map(airline => {
       return airline.airline_name.substring(0, 7);
    });
    const salesData = sales.map(airline => { return airline.sum_sales });
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Sales Amount ($)',
                data: salesData,
                backgroundColor: sales.map(cust => {
                    const coloerIndex = Math.floor(Math.random() * colorPickers.length);
                    const bgColor =colorPickers[coloerIndex];
                    return bgColor;
                })
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top 15 Active Airline Companies',
                color: 'black',
                font: {
                    size: 16
                }
            },
        },
    };
    return (
        <Bar options={options} data={data} />
    )
}

export default ChartAirlineSales


