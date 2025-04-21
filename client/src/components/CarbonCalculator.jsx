// Emission factors (kgCO2 per unit)
const EMISSION_FACTORS = {
  // Household factors
  electricityUsage: 0.82,    // kgCO2 per kWh
  waterUsage: 0.36,          // kgCO2 per liter
  wasteGeneration: 0.5,      // kgCO2 per kg
  gasCylinder: 2.98,         // kgCO2 per liter
  // Transportation factors
  privateVehicle: 2.3,       // kgCO2 per km
  publicVehicle: 0.015,      // kgCO2 per km
  airTravel: 0.24,           // kgCO2 per km
  // Food factors
  vegMeal: 2.5,              // kgCO2 per meal
  nonVegMeal: 7,             // kgCO2 per meal
  // Business factors
  Electricity_Usage: 0.82,
  Water_Usage: 0.36,
  Paper_Consumption: 0.5,
  Waste_Generation: 0.5,
  Fuel_Consumption: 2.98,
  Business_Travel: 0.24
};

// Conversion factors for business calculations
const BUSINESS_CONVERSIONS = {
  Water_Usage: 3.78541,      // gallons to liters
  Waste_Generation: 1000,    // tonnes to kg
  Fuel_Consumption: 3.78541  // gallons to liters
};

// Helper function to safely parse values
const safeParse = (value) => Math.max(0, parseFloat(value) || 0);

// Main calculation functions
export const calculateTotalCarbonFootprint = (formData, familyData) => {
  // Calculate household footprint
  const householdFootprint = Object.keys(formData).reduce((total, key) => {
    return total + safeParse(formData[key]) * (EMISSION_FACTORS[key] || 0);
  }, 0);

  // Calculate family members' footprints
  const familyFootprint = familyData.reduce((total, member) => {
    const transport = 
      safeParse(member.transportation.privateVehicle) * EMISSION_FACTORS.privateVehicle +
      safeParse(member.transportation.publicVehicle) * EMISSION_FACTORS.publicVehicle +
      safeParse(member.transportation.airTravel) * EMISSION_FACTORS.airTravel;
      
    const food = 
      safeParse(member.food.vegMeals) * EMISSION_FACTORS.vegMeal +
      safeParse(member.food.nonVegMeals) * EMISSION_FACTORS.nonVegMeal;

    return total + transport + food;
  }, 0);

  return householdFootprint + familyFootprint;
};

export const calculateContributions = (formData, familyData, total) => {
  if (total <= 0) return [];

  const contributions = [];

  // Add household contributions
  if (formData.electricityUsage) {
    contributions.push({
      category: "Electricity",
      value: safeParse(formData.electricityUsage) * EMISSION_FACTORS.electricityUsage
    });
  }

  if (formData.waterUsage) {
    contributions.push({
      category: "Water",
      value: safeParse(formData.waterUsage) * EMISSION_FACTORS.waterUsage
    });
  }

  if (formData.wasteGeneration) {
    contributions.push({
      category: "Waste",
      value: safeParse(formData.wasteGeneration) * EMISSION_FACTORS.wasteGeneration
    });
  }

  if (formData.gasCylinder) {
    contributions.push({
      category: "Gas",
      value: safeParse(formData.gasCylinder) * EMISSION_FACTORS.gasCylinder
    });
  }

  // Add family member contributions (aggregated)
  const familyContributions = familyData.reduce((acc, member) => {
    acc.veg += safeParse(member.food.vegMeals) * EMISSION_FACTORS.vegMeal;
    acc.nonVeg += safeParse(member.food.nonVegMeals) * EMISSION_FACTORS.nonVegMeal;
    acc.private += safeParse(member.transportation.privateVehicle) * EMISSION_FACTORS.privateVehicle;
    acc.public += safeParse(member.transportation.publicVehicle) * EMISSION_FACTORS.publicVehicle;
    acc.air += safeParse(member.transportation.airTravel) * EMISSION_FACTORS.airTravel;
    return acc;
  }, { veg: 0, nonVeg: 0, private: 0, public: 0, air: 0 });

  if (familyContributions.veg > 0) {
    contributions.push({
      category: "Vegetarian Meals",
      value: familyContributions.veg
    });
  }

  if (familyContributions.nonVeg > 0) {
    contributions.push({
      category: "Non-Vegetarian Meals",
      value: familyContributions.nonVeg
    });
  }

  if (familyContributions.private > 0) {
    contributions.push({
      category: "Private Transport",
      value: familyContributions.private
    });
  }

  if (familyContributions.public > 0) {
    contributions.push({
      category: "Public Transport",
      value: familyContributions.public
    });
  }

  if (familyContributions.air > 0) {
    contributions.push({
      category: "Air Travel",
      value: familyContributions.air
    });
  }

  // Calculate percentages and filter near-zero values
  return contributions
    .filter(item => item.value > 0.1) // Ignore trivial contributions
    .map(item => ({
      ...item,
      percentage: (item.value / total) * 100
    }));
};

// Business calculations
export const calculateBusinessCarbonFootprint = (formData) => {
  return Object.keys(formData).reduce((total, key) => {
    const value = safeParse(formData[key]);
    const conversion = BUSINESS_CONVERSIONS[key] || 1;
    return total + value * conversion * (EMISSION_FACTORS[key] || 0);
  }, 0);
};

export const calculateBusinessContributions = (formData, total) => {
  if (total <= 0) return [];

  return Object.keys(formData)
    .map(key => {
      const value = safeParse(formData[key]);
      const conversion = BUSINESS_CONVERSIONS[key] || 1;
      return {
        category: key.replace(/_/g, " "),
        value: value * conversion * (EMISSION_FACTORS[key] || 0)
      };
    })
    .filter(item => item.value > 0)
    .map(item => ({
      ...item,
      percentage: (item.value / total) * 100
    }));
};