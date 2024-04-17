import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  id: { type: String},
  name: { type: String },
  description: { type: String},
  pathology: { type: String},
  roiImage: { type: String},
  nonRoiImage: { type: String},
  
  doctor: { type: String, ref: 'User', field: 'clerkId' },
  patient: { type: String, ref: 'User', field: 'clerkId' },
  labStaff: { type: String, ref: 'User', field: 'clerpkId' },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;