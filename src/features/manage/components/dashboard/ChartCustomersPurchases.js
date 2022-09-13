import React from 'react'
import { useSelector } from 'react-redux'
import { SelectPurchasers } from '../../manageSlice';

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

const ChartCustomersPurchases = () => {
    const purchasers = useSelector(SelectPurchasers);
    if (!purchasers) {
        return (<div></div>);
    }
    const labels = purchasers.map(cust => {
        const firstName = cust.customer_name.split(' ')[0];
        const lastName = cust.customer_name.split(' ')[1];
        const customerName = `${firstName.charAt(0)}. ${lastName}`;
        return customerName;
    });
    const purchasersData = purchasers.map(cust => { return cust.sum_purchases });
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Purchases Amount ($)',
                data: purchasersData,
                backgroundColor: purchasers.map(cust => {
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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return purchasers[tooltipItem.index].customer_name
                    }
                }
            },
            title: {
                display: true,
                text: 'Top 15 Active Customers',
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

export default ChartCustomersPurchases
