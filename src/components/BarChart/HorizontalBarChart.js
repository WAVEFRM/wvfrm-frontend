import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);
const HorizontalBarChart = ({ datas }) => {


    // Sample data for the chart
    const data = {
        labels: ['Acousticness', 'Danceability', 'Instrumentalness','Speechiness','Valence', 'Energy', 'Liveness'],
        datasets: [
            {
                label: 'Song Attributes',
                data: [
                    datas.acousticness,
                    datas.danceability,
                    datas.instrumentalness,
                    datas.valence,
                    datas.energy,
                    datas.liveness,
                    datas.speechiness
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(128, 128, 128, 0.3)' // Gray color
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(128, 128, 128, 1)' // Gray color
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        maintainAspectRatio: false, // Disable aspect ratio
        aspectRatio: 1, // Set custom aspect ratio
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Horizontal Bar Chart',
            },
        },
        scales: {
            x: {
                type: 'linear', // Explicitly specify the scale type
                barThickness: 10,
            },
        },
    };

    return (
        <div style={{ width: '90%', height: '70vh', margin: '0 auto' }}> {/* Set custom width and height */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarChart;
