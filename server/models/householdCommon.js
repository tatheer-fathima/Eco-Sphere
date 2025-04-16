import mongoose from 'mongoose';

const householdCommonSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  electricity_usage: {
    type: Number,
    default: 0
  },
  water_usage: {
    type: Number,
    default: 0
  },
  waste_generation: {
    type: Number,
    default: 0
  },
  gas_cylinder: {
    type: Number,
    default: 0
  }
}, {
  collection: 'household_common',
  timestamps: false
});

const HouseholdCommon = mongoose.model('HouseholdCommon', householdCommonSchema);

export default HouseholdCommon;
