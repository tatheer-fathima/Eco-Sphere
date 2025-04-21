// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ contributions }) => {
//   if (!contributions || contributions.length === 0) return null;

//   const data = {
//     labels: contributions.map(item => item.category),
//     datasets: [
//       {
//         data: contributions.map(item => item.value),
//         backgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
//           '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
//         ],
//         hoverBackgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
//           '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
//         ]
//       }
//     ]
//   };

//   return (
//     <div className="w-full h-full">
//       <Pie data={data} />
//     </div>
//   );
// };

// export default PieChart;
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ contributions }) => {
  if (!contributions || contributions.length === 0) return null;

  const data = {
    labels: contributions.map(item => item.category),
    datasets: [
      {
        data: contributions.map(item => item.value),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Carbon Footprint Distribution',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = contributions[context.dataIndex].percentage.toFixed(1);
            return `${label}: ${value} kgCO₂ (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;