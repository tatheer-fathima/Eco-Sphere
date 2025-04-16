import mongoose from 'mongoose';

const BusinessCommonSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  electricity_usage: Number,
  water_usage: Number,
  paper_consumption: Number,
  waste_generation: Number,
  fuel_consumption: Number,
  business_travel: Number
});

const BusinessCommon = mongoose.model('BusinessCommon', BusinessCommonSchema);

export default BusinessCommon;
