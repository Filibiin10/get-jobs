// Import required modules and models
import express from 'express';
import mongoose from 'mongoose';
import Job from './models/Job.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://jobs-repo.netlify.app/'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json()); // Add this line to parse JSON request bodies

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().limit(100);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Create a new job
app.post('/jobs', async (req, res) => {
  const { title, description, category, experienceLevel, location, company, salary } = req.body;

  const newJob = new Job({
    title,
    description,
    category,
    experienceLevel,
    location,
    company,
    salary,
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error });
  }
});

// User API endpoint (as per your existing code)
app.get('/users', (req, res) => {
  res.send('User API');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
