import mongoose from 'mongoose';

const { Schema } = mongoose;

const familyMemberSchema = new Schema({
  household_common_id: {
    type: mongoose.Schema.Types.ObjectId,  // Change to ObjectId
    ref: 'HouseholdCommon',                // Reference to HouseholdCommon model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  private_vehicle: {
    type: Number,
    required: true
  },
  public_vehicle: {
    type: Number,
    required: true
  },
  air_travel: {
    type: Number,
    required: true
  },
  veg_meals: {
    type: Number,
    required: true
  },
  non_veg_meals: {
    type: Number,
    required: true
  },
}, {
  timestamps: false
});

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);

export default FamilyMember;
