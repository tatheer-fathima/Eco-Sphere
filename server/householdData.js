import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from "dotenv";

import { HouseholdCommon } from './models/householdCommon.js';
import { FamilyMember } from './models/familyMember.js';

const app = express();
const port = 3003;
env.config();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Route to handle saving data to database
app.post('/saveData', async (req, res) => {
  try {
    const { commonFormData, familyFormData, userId } = req.body;

    // Insert into HouseholdCommon table
    const householdCommon = await HouseholdCommon.create({
      user_id: userId,
      electricity_usage: commonFormData.electricityUsage,
      water_usage: commonFormData.waterUsage,
      waste_generation: commonFormData.wasteGeneration,
      gas_cylinder: commonFormData.gasCylinder
    });

    const householdId = householdCommon.id;

    // Insert into FamilyMembers table
    for (const member of familyFormData) {
      await FamilyMember.create({
        household_common_id: householdId,
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
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
