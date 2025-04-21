// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = ({ contributions }) => {
//   if (!contributions || contributions.length === 0) return null;

//   const data = {
//     labels: contributions.map(item => item.category),
//     datasets: [
//       {
//         label: 'Carbon Footprint (kgCO₂)',
//         data: contributions.map(item => item.value),
//         backgroundColor: '#36A2EB',
//         borderColor: '#36A2EB',
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Carbon Footprint by Category',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'kgCO₂'
//         }
//       }
//     }
//   };

//   return (
//     <div className="w-full h-full">
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ contributions }) => {
  if (!contributions || contributions.length === 0) return null;

  const data = {
    labels: contributions.map(item => item.category),
    datasets: [
      {
        label: 'Carbon Footprint (kgCO₂)',
        data: contributions.map(item => item.value),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#8AC24A', '#F06292'
        ],
        borderColor: [
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Carbon Footprint by Category',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} kgCO₂ (${contributions[context.dataIndex].percentage.toFixed(1)}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Footprint (kgCO₂)'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;