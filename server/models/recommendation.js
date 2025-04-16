import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  business_common_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessCommon' },
  recommendation: String
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

export default Recommendation;
