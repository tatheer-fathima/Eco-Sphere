// // Charts.jsx
// import React from 'react';
// import { Pie, Doughnut, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
// import { Line, Radar, PolarArea } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     tooltip: {
//       callbacks: {
//         label: function(context) {
//           return `${context.label}: ${context.raw} kgCO₂ (${context.parsed}%)`;
//         }
//       }
//     }
//   }
// };

// const getChartData = (contributions) => {
//   return {
//     labels: contributions.map(item => item.category),
//     datasets: [{
//       data: contributions.map(item => item.value),
//       backgroundColor: [
//         '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
//         '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
//       ],
//       borderWidth: 1
//     }]
//   };
// };

// export const PieChart = ({ contributions }) => (
//   <Pie data={getChartData(contributions)} options={chartOptions} />
// );

// export const DoughnutChart = ({ contributions }) => (
//   <Doughnut data={getChartData(contributions)} options={chartOptions} />
// );

// export const BarChart = ({ contributions }) => {
//   const barOptions = {
//     ...chartOptions,
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
  
//   return <Bar data={getChartData(contributions)} options={barOptions} />;
// };

// export const LineChart = ({ contributions }) => (
//     <Line 
//       data={getChartData(contributions)} 
//       options={{
//         ...chartOptions,
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: { display: true, text: 'kgCO₂' }
//           }
//         }
//       }} 
//     />
//   );
  
//   export const RadarChart = ({ contributions }) => (
//     <Radar 
//       data={getChartData(contributions)} 
//       options={chartOptions} 
//     />
//   );
  
//   export const PolarAreaChart = ({ contributions }) => (
//     <PolarArea 
//       data={getChartData(contributions)} 
//       options={chartOptions} 
//     />
//   );
import React from 'react';
import { 
  Pie, 
  Doughnut, 
  Bar, 
  Line, 
  Radar, 
  PolarArea 
} from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';

// Register all required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.label}: ${context.raw} kgCO₂ (${context.parsed}%)`;
        }
      }
    }
  }
};

// Enhanced getChartData function that works for all chart types
const getChartData = (contributions) => {
  return {
    labels: contributions.map(item => item.category),
    datasets: [{
      label: 'Carbon Footprint',
      data: contributions.map(item => item.value),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
      ],
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };
};

// Pie Chart (existing)
export const PieChart = ({ contributions }) => (
  <Pie data={getChartData(contributions)} options={chartOptions} />
);

// Doughnut Chart (existing)
export const DoughnutChart = ({ contributions }) => (
  <Doughnut data={getChartData(contributions)} options={chartOptions} />
);

// Bar Chart (existing)
export const BarChart = ({ contributions }) => {
  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'kgCO₂'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categories'
        }
      }
    }
  };
  
  return <Bar data={getChartData(contributions)} options={barOptions} />;
};


// 2. LINE CHART (Fixed - now shows as line chart)
export const LineChart = ({ contributions }) => {
    const data = {
      labels: contributions.map(item => item.category),
      datasets: [{
        label: 'Carbon Footprint',
        data: contributions.map(item => item.value),
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: backgroundColor,
        pointBorderColor: '#fff',
        pointRadius: 5,
        tension: 0.1
      }]
    };
  
    const options = {
      ...commonOptions,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'kgCO₂' }
        },
        x: {
          title: { display: true, text: 'Categories' }
        }
      }
    };
  
    return <Line data={data} options={options} />;
  };
  
  // 3. RADAR CHART (Fixed - now shows radar/spider web)
  export const RadarChart = ({ contributions }) => {
    const data = {
      labels: contributions.map(item => item.category),
      datasets: [{
        label: 'Carbon Footprint',
        data: contributions.map(item => item.value),
        backgroundColor: backgroundColor.map(color => `${color}80`),
        borderColor: backgroundColor,
        borderWidth: 2,
        pointBackgroundColor: backgroundColor,
        pointBorderColor: '#fff',
        pointRadius: 4
      }]
    };
  
    const options = {
      ...commonOptions,
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 0,
          ticks: { 
            backdropColor: 'transparent',
            stepSize: Math.ceil(Math.max(...contributions.map(c => c.value)) / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.1
        }
      }
    };
  
    return <Radar data={data} options={options} />;
  };
  
  // 4. POLAR AREA CHART (Fixed - now shows as polar segments)
  export const PolarAreaChart = ({ contributions }) => {
    const data = {
      labels: contributions.map(item => item.category),
      datasets: [{
        label: 'Carbon Footprint',
        data: contributions.map(item => item.value),
        backgroundColor,
        borderColor: '#fff',
        borderWidth: 1
      }]
    };
  
    const options = {
      ...commonOptions,
      scales: {
        r: {
          suggestedMin: 0,
          ticks: {
            backdropColor: 'transparent'
          }
        }
      }
    };
  
    return <PolarArea data={data} options={options} />;
  };