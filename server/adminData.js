import express from 'express';
import User from './models/User.js'; // Mongoose model for users
import Contact from './models/contact.js'; // Mongoose model for contacts
import HouseholdCommon from './models/householdCommon.js'; // Mongoose model for household data
import BusinessCommon from './models/businessCommon.js'; // Mongoose model for business data
import FamilyMembers from './models/familyMember.js'; // Mongoose model for family members

const adminRouter = express.Router();

// Get all users
adminRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'id name email isVerified type'); // Get only necessary fields
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Get all contact details
adminRouter.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({}, 'id name email message'); // Get necessary fields
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).send('Error fetching contact details');
  }
});

// Get user details by ID
adminRouter.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  console.log("USERID", userId);

  try {
    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Fetch related data (Household, Business, Family Members)
    const household = await HouseholdCommon.find({ user_id: userId });
    const business = await BusinessCommon.find({ user_id: userId });
    const familyMembers = await FamilyMembers.find({
      household_common_id: { $in: household.map(h => h._id) }
    });

    // Send the response
    res.status(200).json({
      user,
      household,
      business,
      familyMembers,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Error fetching user details');
  }
});

export default adminRouter;
