import mongoose from 'mongoose';

const businessCommonSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  electricity_usage: { type: Number, required: false },
  water_usage: { type: Number, required: false },
  paper_consumption: { type: Number, required: false },
  waste_generation: { type: Number, required: false },
  fuel_consumption: { type: Number, required: false },
  business_travel: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },
});

const BusinessCommon = mongoose.model('BusinessCommon', businessCommonSchema);

export default BusinessCommon;
