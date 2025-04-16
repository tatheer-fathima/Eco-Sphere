import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  household_common_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HouseholdCommon', required: true },
  business_common_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessCommon', required: true },
  recommendation: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
