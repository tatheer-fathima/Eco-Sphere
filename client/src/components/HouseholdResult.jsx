// // // // import React from 'react';
// // // // import DoughnutChart from './DoughnutChart';

// // // // const HouseholdResult = ({ totalCarbonFootprint, contributions, Recommendation }) => {
// // // //   function formatRecommendations(data) {
// // // //     return data
// // // //       .replace(/## (.*?):/g, '<h2>$1</h2>')
// // // //       .replace(/### (.*?):/g, '<h3>$1</h3>')
// // // //       .replace(/#### (.*?):/g, '<h4>$1</h4>')
// // // //       .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
// // // //       .replace(/\- (.*?):/g, '<li>$1</li>')
// // // //       .replace(/\n/g, '<br />'); // Add line breaks for better readability
// // // //   }

// // // //   const formattedRecommendations = formatRecommendations(Recommendation);

// // // //   return (
// // // //     <div className="mt-4 mb-16 space-y-16">
// // // //       {totalCarbonFootprint !== null && (
// // // //         <div className="mt-4 flex flex-col justify-center items-center">
// // // //           <h3 className="text-lg md:text-xl font-medium mb-2 mx-4">Total Carbon Footprint</h3>
// // // //           <p className='mx-4 text-3xl md:text-6xl font-medium'>
// // // //             {Math.round(totalCarbonFootprint * 100) / 100} 
// // // //             <span className='font-thin'> KgCO<sub>2</sub></span>
// // // //           </p>
// // // //         </div>
// // // //       )}
// // // //       {/* Render Doughnut Chart */}
// // // //       <DoughnutChart contributions={contributions} />
      
// // // //       <div className="recommendations mt-4 p-4 bg-gray-100 rounded-lg">
// // // //         <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
// // // //         <div 
// // // //           className="recommendation-content"
// // // //           dangerouslySetInnerHTML={{ __html: formattedRecommendations }} 
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default HouseholdResult;
// // // import React from 'react';
// // // import { PieChart, DoughnutChart } from './Charts';

// // // const HouseholdResult = ({ totalCarbonFootprint, contributions, recommendation }) => {
// // //   return (
// // //     <div className="p-4 bg-white rounded-lg shadow-lg">
// // //       <h2 className="text-2xl font-bold mb-4">Your Carbon Footprint Results</h2>
      
// // //       <div className="mb-6 p-4 bg-gray-100 rounded-lg">
// // //         <h3 className="text-xl font-semibold mb-2">Total Carbon Footprint</h3>
// // //         <p className="text-3xl font-bold text-green-600">
// // //           {totalCarbonFootprint.toFixed(2)} KgCO<sub>2</sub>
// // //         </p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// // //         <div className="bg-white p-4 rounded-lg shadow">
// // //           <PieChart contributions={contributions} />
// // //         </div>
// // //         <div className="bg-white p-4 rounded-lg shadow">
// // //           <DoughnutChart contributions={contributions} />
// // //         </div>
// // //       </div>

// // //       {recommendation && (
// // //         <div className="p-4 bg-blue-50 rounded-lg">
// // //           <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
// // //           <p className="text-gray-700">{recommendation}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default HouseholdResult;

// // import React, { useState } from "react";
// // import PieChart from "./Charts/PieChart.jsx";
// // import DoughnutChart from "./Charts/DoughnutChart.jsx";
// // import BarChart from "./Charts/BarChart.jsx";

// // const HouseholdResult = ({
// //   totalCarbonFootprint,
// //   contributions,
// //   recommendation,
// // }) => {
// //   const [chartType, setChartType] = useState("bar"); // 'pie', 'doughnut', or 'bar'

// //   const renderChart = () => {
// //     switch (chartType) {
// //       case "pie":
// //         return <PieChart contributions={contributions} />;
// //       case "doughnut":
// //         return <DoughnutChart contributions={contributions} />;
// //       default:
// //         return <BarChart contributions={contributions} />;
// //     }
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// //       <h2 className="text-2xl font-bold mb-6 text-center">
// //         Your Household Carbon Footprint Results
// //       </h2>

// //       <div className="mb-6 p-4 bg-blue-50 rounded-lg">
// //         <h3 className="text-xl font-semibold mb-2">Total Carbon Footprint</h3>
// //         <p className="text-3xl font-bold text-blue-600">
// //           {totalCarbonFootprint.toFixed(2)} kgCO<sub>2</sub>
// //         </p>
// //       </div>

// //       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
// //         <div className="flex justify-center space-x-4 mb-4">
// //           <button
// //             onClick={() => setChartType("bar")}
// //             className={`px-4 py-2 rounded ${
// //               chartType === "bar"
// //                 ? "bg-blue-500 text-white"
// //                 : "bg-gray-200 text-gray-700"
// //             }`}
// //           >
// //             Bar Chart
// //           </button>
// //           <button
// //             onClick={() => setChartType("pie")}
// //             className={`px-4 py-2 rounded ${
// //               chartType === "pie"
// //                 ? "bg-blue-500 text-white"
// //                 : "bg-gray-200 text-gray-700"
// //             }`}
// //           >
// //             Pie Chart
// //           </button>
// //           <button
// //             onClick={() => setChartType("doughnut")}
// //             className={`px-4 py-2 rounded ${
// //               chartType === "doughnut"
// //                 ? "bg-blue-500 text-white"
// //                 : "bg-gray-200 text-gray-700"
// //             }`}
// //           >
// //             Doughnut Chart
// //           </button>
// //         </div>

// //         <div className="h-96">{renderChart()}</div>
// //       </div>

// //       <div className="mb-6 p-4 bg-green-50 rounded-lg">
// //         <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
// //         <p className="text-gray-700">{recommendation}</p>
// //       </div>

// //       <div className="mt-6">
// //         <h3 className="text-lg font-semibold mb-3">Detailed Breakdown</h3>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white border border-gray-200">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="py-3 px-4 border-b text-left">Category</th>
// //                 <th className="py-3 px-4 border-b text-left">Footprint (kgCO₂)</th>
// //                 <th className="py-3 px-4 border-b text-left">Percentage</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {contributions.map((item, index) => (
// //                 <tr key={index} className="hover:bg-gray-50">
// //                   <td className="py-3 px-4 border-b">{item.category}</td>
// //                   <td className="py-3 px-4 border-b">{item.value.toFixed(2)}</td>
// //                   <td className="py-3 px-4 border-b">{item.percentage.toFixed(1)}%</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HouseholdResult;

// import React, { useState } from "react";
// import PieChart from "./Charts/PieChart";
// import DoughnutChart from "./Charts/DoughnutChart";
// import BarChart from "./Charts/BarChart";

// const HouseholdResult = ({
//   totalCarbonFootprint,
//   contributions,
//   recommendation,
// }) => {
//   const [chartType, setChartType] = useState("bar");

//   const renderChart = () => {
//     if (!contributions || contributions.length === 0) {
//       return (
//         <div className="flex items-center justify-center h-64">
//           <p className="text-gray-500">No data available for visualization</p>
//         </div>
//       );
//     }

//     switch (chartType) {
//       case "pie":
//         return <PieChart contributions={contributions} />;
//       case "doughnut":
//         return <DoughnutChart contributions={contributions} />;
//       default:
//         return <BarChart contributions={contributions} />;
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Your Household Carbon Footprint Results
//       </h2>

//       <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//         <h3 className="text-xl font-semibold mb-2">Total Carbon Footprint</h3>
//         <p className="text-3xl font-bold text-blue-600">
//           {totalCarbonFootprint.toFixed(2)} kgCO<sub>2</sub>
//         </p>
//       </div>

//       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//         <div className="flex flex-wrap justify-center gap-4 mb-4">
//           <button
//             onClick={() => setChartType("bar")}
//             className={`px-4 py-2 rounded transition-colors ${
//               chartType === "bar"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Bar Chart
//           </button>
//           <button
//             onClick={() => setChartType("pie")}
//             className={`px-4 py-2 rounded transition-colors ${
//               chartType === "pie"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Pie Chart
//           </button>
//           <button
//             onClick={() => setChartType("doughnut")}
//             className={`px-4 py-2 rounded transition-colors ${
//               chartType === "doughnut"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Doughnut Chart
//           </button>
//         </div>

//         <div className="h-96 w-full">{renderChart()}</div>
//       </div>

//       {recommendation && (
//         <div className="mb-6 p-4 bg-green-50 rounded-lg">
//           <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
//           <p className="text-gray-700">{recommendation}</p>
//         </div>
//       )}

//       {contributions && contributions.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-3">Detailed Breakdown</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-3 px-4 border-b text-left">Category</th>
//                   <th className="py-3 px-4 border-b text-left">Footprint (kgCO₂)</th>
//                   <th className="py-3 px-4 border-b text-left">Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contributions.map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-3 px-4 border-b">{item.category}</td>
//                     <td className="py-3 px-4 border-b">{item.value.toFixed(2)}</td>
//                     <td className="py-3 px-4 border-b">{item.percentage.toFixed(1)}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HouseholdResult;

// Updated HouseholdResult.jsx
import React, { useState } from "react";
import { PieChart, DoughnutChart, BarChart } from "./Charts";

const HouseholdResult = ({
  totalCarbonFootprint = 0,
  contributions = [],
  recommendation = null
}) => {
  const [chartType, setChartType] = useState("bar");

  const formatNumber = (value, decimals = 2) => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(decimals);
  };

  const validContributions = Array.isArray(contributions) 
    ? contributions.filter(cont => cont?.value > 0)
    : [];

  const renderChart = () => {
    if (validContributions.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No valid data available for visualization</p>
        </div>
      );
    }

    const chartProps = { contributions: validContributions };
    
    switch (chartType) {
      case "pie": return <PieChart {...chartProps} />;
      case "doughnut": return <DoughnutChart {...chartProps} />;
      default: return <BarChart {...chartProps} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Carbon Footprint Results
      </h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Total Carbon Footprint</h3>
        <p className="text-3xl font-bold text-blue-600">
          {formatNumber(totalCarbonFootprint)} kgCO<sub>2</sub>
        </p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {['bar', 'pie', 'doughnut', 'line', 'radar', 'polarArea'].map(type => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-4 py-2 rounded transition-colors ${
                chartType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Chart
            </button>
          ))}
        </div>

        <div className="h-96 w-full">{renderChart()}</div>
      </div>

      {recommendation && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
          <p className="font-semibold mb-2">{recommendation.summary}</p>
          <ul className="list-disc pl-5">
            {recommendation.suggestions.map((suggestion, index) => (
              <li key={index} className="mb-1">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {validContributions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Category</th>
                <th className="py-3 px-4 border-b text-left">Footprint (kgCO₂)</th>
                <th className="py-3 px-4 border-b text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {validContributions.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b">{item.category || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">{formatNumber(item.value)}</td>
                  <td className="py-3 px-4 border-b">{formatNumber(item.percentage, 1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HouseholdResult;