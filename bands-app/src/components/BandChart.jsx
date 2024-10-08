
import React, { useContext, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

  const { socket } = useContext(SocketContext);

  useEffect(() => {
      socket.on('current-bands', bands => {
        createGraph(bands);
      });
  }, [socket])

  const createGraph =(bands=[])=>{

    setTimeout(() => {
      const ctx = document.getElementById('myChart');
      new Chart(ctx, {
          type: 'bar',
          data: {
            labels: bands.map(band=>band?.name),
            datasets: [{
              label: 'numero de votos',
              data: bands.map(band=>band?.votes),
              borderWidth: 1
            }]
          },
          options: {
           indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      
  }, 500);

  }


    return (
        <canvas id="myChart"></canvas>
    )
}
