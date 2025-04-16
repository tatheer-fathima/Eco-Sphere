import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';
import memorystore from 'memorystore';
import { GoogleGenerativeAI } from '@google/generative-ai'; // ✅ correct
import BusinessCommon from './models/businessCommon.js';  // Import your BusinessCommon model
import Recommendation from './models/recommendation.js';  // Assuming you also have a Recommendation model

const MemoryStore = memorystore(session);
const app = express();

// Load environment variables from .env file
env.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({ checkPeriod: 86400000 })
}));

// POST endpoint to save business data and generate recommendations
app.post('/saveData', async (req, res) => {
  try {
    const { formData, userId } = req.body;

    // Create a new business data entry using the BusinessCommon model
    const businessCommonData = new BusinessCommon({
      user_id: userId,
      electricity_usage: formData.Electricity_Usage,
      water_usage: formData.Water_Usage,
      paper_consumption: formData.Paper_Consumption,
      waste_generation: formData.Waste_Generation,
      fuel_consumption: formData.Fuel_Consumption,
      business_travel: formData.Business_Travel
    });

    const businessCommonResult = await businessCommonData.save();

    // Generate recommendations
    const recommendationData = await recommendation(formData);

    // Save recommendations to MongoDB
    const recommendationEntry = new Recommendation({
      user_id: userId,
      business_common_id: businessCommonResult._id,
      recommendation: recommendationData
    });

    await recommendationEntry.save();

    res.status(200).send(recommendationData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

// Function to generate business recommendations using AI
// Function to generate business recommendations using AI
async function recommendation(formData) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const content = `
    Business details:
    Electricity Usage: ${formData.Electricity_Usage},
    Water Usage: ${formData.Water_Usage},
    Paper Consumption: ${formData.Paper_Consumption},
    Waste Generation: ${formData.Waste_Generation},
    Fuel Consumption: ${formData.Fuel_Consumption},
    Business Travel: ${formData.Business_Travel}

    Generate business recommendations to reduce carbon footprint and increase productivity with headings and subheadings.
  `;

  try {
    const result = await model.generateContent(content);
    console.log('Full AI Response:', result); // Log entire response

    // Check if result has the response object and then call the text function
    if (result && result.response && typeof result.response.text === 'function') {
      const recommendations = await result.response.text();  // Call the text function
      console.log('Generated Recommendations:', recommendations);
      return recommendations;
    } else {
      console.log('No recommendations found in response');
      return 'No recommendations generated.';
    }
  } catch (error) {
    console.error('Error generating content:', error.message);
    return 'Error generating recommendations';
  }
}





// GET endpoint to retrieve business data entries for a user
app.get('/entries', async (req, res) => {
  const userId = req.headers['user-id'];

  try {
    const businessData = await BusinessCommon.find({ user_id: userId });
    res.status(200).json(businessData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export router (if needed for further routing)
export default app;
