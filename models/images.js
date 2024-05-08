import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String},
  pathology: { type: String},
  doctorEmail: { type: String, ref: 'User', field: 'email' },
  patientEmail: { type: String, ref: 'User', field: 'email' },
  imagePath: { type: String },
});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;