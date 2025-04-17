import express from 'express';
import FamilyMember from './models/familyMember.js';
import HouseholdCommon from './models/householdCommon.js';

const router = express.Router();

router.post('/saveData', async (req, res) => {
  try {
    const { commonFormData, familyFormData, userId } = req.body;

    if (!userId) {
      return res.status(400).send('User ID is required');
    }

    // Create HouseholdCommon data
    const householdCommon = await HouseholdCommon.create({
      user_id: userId, // Ensure user_id is passed from frontend
      electricity_usage: commonFormData.electricityUsage,
      water_usage: commonFormData.waterUsage,
      waste_generation: commonFormData.wasteGeneration,
      gas_cylinder: commonFormData.gasCylinder
    });

    const householdId = householdCommon._id; // Get the created ObjectId

    // Create FamilyMember data for each family member
    for (const member of familyFormData) {
      await FamilyMember.create({
        household_common_id: householdId,  // Reference to HouseholdCommon's ObjectId
        name: member.name,
        private_vehicle: member.transportation.privateVehicle,
        public_vehicle: member.transportation.publicVehicle,
        air_travel: member.transportation.airTravel,
        veg_meals: member.food.vegMeals,
        non_veg_meals: member.food.nonVegMeals
      });
    }

    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send(`Error saving data: ${error.message}`);
  }
});

export default router;
