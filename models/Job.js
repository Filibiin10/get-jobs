import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  location: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
  postedDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
