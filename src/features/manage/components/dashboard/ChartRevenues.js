import React from 'react'
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SelectRevenuesByDates } from '../../manageSlice';
import moment from 'moment'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const ChartRevenues = () => {
    const revenues = useSelector(SelectRevenuesByDates);
    if (!revenues){
        return (<div></div>)
    }
    //REVENUES
    const datesLables = revenues.map(day => { return moment(day.result_date).format('DD/MM/YY') });
    const revenuesData = revenues.map(day => { return day.result_sales });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Tickets Revenues by Date',
                color : 'black',
                font: {
                    size: 16
                }
            },
        },
    };
    const data = {
        labels: datesLables,
        datasets: [
            {
                label: 'Revenues',
                data: revenuesData,
                borderColor: '#15291b',
                backgroundColor: '#15291b',
            }
        ]
    }
    return (
        <Line options={options} data={data} />
    )
}

export default ChartRevenues
