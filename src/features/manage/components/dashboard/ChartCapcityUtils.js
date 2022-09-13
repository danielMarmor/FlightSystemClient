import React from 'react'
import { useSelector } from 'react-redux'
import { SelectCapcityUtils } from '../../manageSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const utilizationColors = ['#8cd49f', '#32a852'];

const ChartCapcityUtils = () => {
    const utilization = useSelector(SelectCapcityUtils);

    const data = {
        labels : ['Sold Tickets', 'Remaining Tickets'],
        datasets :[
            {
                label : 'Plains Occupance',
                data :[utilization.num_seats, utilization.sold_tickets, utilization.remaining_tickets],
                backgroundColor : utilizationColors,
                borderColor : 'black',
                borderWidth : 1,
                rotation: -180,
            }
        ]
    }
    const options = {
        responsive: true,
        maintainAspectRatio : false
    };
    return (<Doughnut data={data} options={options}/>)
}

export default ChartCapcityUtils
