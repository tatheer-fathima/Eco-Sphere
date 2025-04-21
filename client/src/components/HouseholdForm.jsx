import React, { useState } from "react";
import HouseholdResult from "./HouseholdResult";
import { toast } from 'react-toastify';
import { calculateTotalCarbonFootprint, calculateContributions } from "./CarbonCalculator";

function HouseholdForm() {
  const [formData, setFormData] = useState({
    electricityUsage: "",
    waterUsage: "",
    wasteGeneration: "",
    gasCylinder: "",
  });

  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleInputChange = (index, key, value) => {
    const updatedFamilyData = [...familyData];
    updatedFamilyData[index][key] = value;
    setFamilyData(updatedFamilyData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFamilySubmit = (e) => {
    e.preventDefault();
    const numMembers = parseInt(numFamilyMembers);
    
    if (numMembers < 1 || isNaN(numMembers)) {
      toast.error("Please enter a valid number of family members.");
      return;
    }
    
    const initialFamilyData = Array(numMembers).fill().map(() => ({
      name: "",
      transportation: {
        privateVehicle: "",
        publicVehicle: "",
        airTravel: "",
      },
      food: { vegMeals: "", nonVegMeals: "" },
    }));
    
    setFamilyData(initialFamilyData);
  };
  // const handleCalculateCF = (e) => {
  //   e.preventDefault();

  //   if (familyData.length === 0) {
  //     toast.error("Click on Next and Enter family member information before calculating.");
  //     return;
  //   }

  //   // Validate form data
  //   for (const key in formData) {
  //     const value = parseFloat(formData[key]);
  //     if (isNaN(value) || value < 0) {
  //       toast.error(`Invalid input for ${key}`);
  //       return;
  //     }
  //   }

  //   // Validate family data
  //   for (const member of familyData) {
  //     for (const category in member) {
  //       if (category === "name") continue;
  //       for (const key in member[category]) {
  //         const value = parseFloat(member[category][key]);
  //         if (isNaN(value) || value < 0) {
  //           toast.error(`Invalid input for ${member.name || 'member'}'s ${category} - ${key}`);
  //           return;
  //         }
  //       }
  //     }
  //   }

  //   // Calculate results
  //   const totalFootprint = calculateTotalCarbonFootprint(formData, familyData);
  //   const calculatedContributions = calculateContributions(formData, familyData, totalFootprint);
  //   const rec = getRecommendations(totalFootprint);

  //   setTotalCarbonFootprint(totalFootprint);
  //   setContributions(calculatedContributions);
  //   setRecommendation(rec);
  //   setShowChart(true);
  // };

  const getRecommendations = (footprint) => {
    const recommendations = [
      {
        threshold: 1000,
        message: "Excellent! Your carbon footprint is very low.",
        suggestions: [
          "Keep up the good work!",
          "Consider renewable energy options to maintain your low impact."
        ]
      },
      {
        threshold: 3000,
        message: "Good! Consider reducing your energy consumption.",
        suggestions: [
          "Switch to LED bulbs",
          "Reduce meat consumption",
          "Use public transportation more often"
        ]
      },
      {
        threshold: Infinity,
        message: "High carbon footprint. Consider significant lifestyle changes.",
        suggestions: [
          "Audit your home energy use",
          "Consider electric vehicles",
          "Reduce air travel",
          "Adopt plant-based diet"
        ]
      }
    ];
  
    const { message, suggestions } = recommendations.find(
      r => footprint < r.threshold
    );
  
    return {
      summary: message,
      suggestions,
      footprintValue: footprint
    };
  };
  
  const validateInput = (value, fieldName) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return { valid: false, error: `Please enter a valid number for ${fieldName}` };
    }
    if (numValue < 0) {
      return { valid: false, error: `${fieldName} cannot be negative` };
    }
    return { valid: true, value: numValue };
  };
  
  const handleCalculateCF = async (e) => {
    e.preventDefault();
  
    try {
      // Validate family data exists
      if (familyData.length === 0) {
        toast.error("Please enter family member information before calculating.");
        return;
      }
  
      // Validate form inputs
      const validatedFormData = {};
      for (const key in formData) {
        const validation = validateInput(formData[key], key);
        if (!validation.valid) {
          toast.error(validation.error);
          return;
        }
        validatedFormData[key] = validation.value;
      }
  
      // Validate family member data
      const validatedFamilyData = familyData.map((member, index) => {
        const validatedMember = { name: member.name || `Member ${index + 1}` };
        
        for (const category in member) {
          if (category === "name") continue;
          
          validatedMember[category] = {};
          for (const key in member[category]) {
            const fieldName = `${validatedMember.name}'s ${category} ${key}`;
            const validation = validateInput(member[category][key], fieldName);
            if (!validation.valid) {
              toast.error(validation.error);
              return null;
            }
            validatedMember[category][key] = validation.value;
          }
        }
        return validatedMember;
      });
  
      if (validatedFamilyData.includes(null)) return;
  
      // Calculate results
      const totalFootprint = calculateTotalCarbonFootprint(validatedFormData, validatedFamilyData);
      const calculatedContributions = calculateContributions(validatedFormData, validatedFamilyData, totalFootprint);
      const recommendation = getRecommendations(totalFootprint);
  
      // Save results
      setTotalCarbonFootprint(totalFootprint);
      setContributions(calculatedContributions);
      setRecommendation(recommendation);
      setShowChart(true);
  
      // Success feedback
      toast.success("Calculation completed successfully!");
      
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("An error occurred during calculation. Please try again.");
    }
  };


  return (
    <div className="p-4  m-2 mt-10">
      {/* Render the doughnut chart only if showChart state is true */}
      {showChart && (
        <HouseholdResult
          totalCarbonFootprint={totalCarbonFootprint}
          contributions={contributions}
          recommendation={recommendation}
        />
      )}
      {!showChart && (
        <form
          onSubmit={handleCalculateCF}
          className=" mx-auto p-2 md:p-4 w-fit bg-gray-200 rounded-lg shadow-lg"
        >
          {/* Form fields */}
          <div className="text-3xl md:text-4xl flex flex-col items-center justify-center p-4">
            <p>Household Form</p>
            <p className="text-base md:text-lg font-thin">
              Note : Fill your monthly data
            </p>
          </div>
          <div className=" flex flex-col items-center justify-center ">
            <div className="mb-4">
              <label
                htmlFor="electricityUsage"
                className="block text-sm font-medium text-gray-700"
              >
                Electricity Usage
              </label>
              <input
                type="text"
                id="electricityUsage"
                name="electricityUsage"
                value={formData.electricityUsage}
                onChange={handleChange}
                className="mt-1 p-2 block w-fit shadow-sm border border-gray-300 rounded-md"
                placeholder="Enter in Kwh"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="waterUsage"
                className="block text-sm font-medium text-gray-700"
              >
                Water Usage
              </label>
              <input
                type="text"
                id="waterUsage"
                name="waterUsage"
                value={formData.waterUsage}
                onChange={handleChange}
                className="mt-1 p-2 block w-fit shadow-sm border border-gray-300 rounded-md"
                placeholder="Enter in litres"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="wasteGeneration"
                className="block text-sm font-medium text-gray-700"
              >
                Waste Generation
              </label>
              <input
                type="text"
                id="wasteGeneration"
                name="wasteGeneration"
                value={formData.wasteGeneration}
                onChange={handleChange}
                className="mt-1 p-2 block w-fit shadow-sm border border-gray-300 rounded-md"
                placeholder="Enter in Kg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gasCylinder"
                className="block text-sm font-medium text-gray-700"
              >
                Gas Cylinder
              </label>
              <input
                type="text"
                id="gasCylinder"
                name="gasCylinder"
                value={formData.gasCylinder}
                onChange={handleChange}
                className="mt-1 p-2 block w-fit shadow-sm border border-gray-300 rounded-md"
                placeholder="Enter in litres"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numFamilyMembers"
                className="block text-sm font-medium  text-gray-700"
              >
                How many members are in your family?
              </label>
              <input
                type="number"
                id="numFamilyMembers"
                value={numFamilyMembers}
                onChange={(e) => setNumFamilyMembers(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4"
                min="1"
                required
              />
              <button
                onClick={handleFamilySubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded"
              >
                Next
              </button>
            </div>

            {!showChart && (
              <div className="mt-2 mb-8  grid grid-cols-1 md:grid-cols-3 gap-4  ">
                {/* Family member cards */}
                {familyData.map((member, index) => (
                  <div
                    key={index}
                    className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl"
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      Member : {member.name ? member.name : index + 1}
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name<span className="font-thin"> (Optional) </span>
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        placeholder="Enter Name"
                        className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                      />
                      <label className=" text-sm font-medium text-gray-700 flex items-center">
                        <p className="ml-1 text-xs">
                          Enter Distance Travelled in Km via :
                        </p>
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={member.transportation.privateVehicle}
                          onChange={(e) =>
                            handleInputChange(index, "transportation", {
                              ...member.transportation,
                              privateVehicle: e.target.value,
                            })
                          }
                          placeholder="Private Vehicle"
                          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={member.transportation.publicVehicle}
                          onChange={(e) =>
                            handleInputChange(index, "transportation", {
                              ...member.transportation,
                              publicVehicle: e.target.value,
                            })
                          }
                          placeholder="Public Vehicle"
                          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={member.transportation.airTravel}
                          onChange={(e) =>
                            handleInputChange(index, "transportation", {
                              ...member.transportation,
                              airTravel: e.target.value,
                            })
                          }
                          placeholder="Air Travel"
                          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                        />
                      </div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <p className="text-xs ml-1">Enter No. of Meals :</p>
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={member.food.vegMeals}
                          onChange={(e) =>
                            handleInputChange(index, "food", {
                              ...member.food,
                              vegMeals: e.target.value,
                            })
                          }
                          placeholder="Veg Meals"
                          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={member.food.nonVegMeals}
                          onChange={(e) =>
                            handleInputChange(index, "food", {
                              ...member.food,
                              nonVegMeals: e.target.value,
                            })
                          }
                          placeholder="Non-Veg Meals"
                          className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleCalculateCF}
            >
              Calculate Carbon Footprint
            </button>

            {totalCarbonFootprint !== null && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">
                  Total Carbon Footprint
                </h3>
                <p>
                  {totalCarbonFootprint} KgCO<sub>2</sub>
                </p>
                <p className="font-thin">
                  To see more interactive visual representation...do sign-up
                </p>
              </div>
            )}
          </div>
        </form>
      )}
      {/*{!showChart && (<div className="mt-2 mb-8  grid grid-cols-1 md:grid-cols-3 gap-4  ">
      
      {familyData.map((member, index) => (
        <div key={index} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Member : {member.name ? member.name : index + 1}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              placeholder="Enter Name"
              className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            />
            <label className=" text-sm font-medium text-gray-700 flex items-center">Transportation :<p className='ml-1 text-xs'>Enter Distance Travelled in Km</p></label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={member.transportation.privateVehicle}
                onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, privateVehicle: e.target.value })}
                placeholder="Private Vehicle"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={member.transportation.publicVehicle}
                onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, publicVehicle: e.target.value })}
                placeholder="Public Vehicle"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={member.transportation.airTravel}
                onChange={(e) => handleInputChange(index, 'transportation', { ...member.transportation, airTravel: e.target.value })}
                placeholder="Air Travel"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
            </div>
            <label className="flex items-center text-sm font-medium text-gray-700">Food :<p className='text-xs ml-1'>Enter No. of Meals</p></label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={member.food.vegMeals}
                onChange={(e) => handleInputChange(index, 'food', { ...member.food, vegMeals: e.target.value })}
                placeholder="Veg Meals"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={member.food.nonVegMeals}
                onChange={(e) => handleInputChange(index, 'food', { ...member.food, nonVegMeals: e.target.value })}
                placeholder="Non-Veg Meals"
                className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      ))}
    </div>)}*/}
    </div>
  );
}

export default HouseholdForm;

//const calculateContributions = (formData, familyData) => {
// Define emission factors for each input
//const emissionFactors = {
