import express from 'express';
import mongoose from 'mongoose';
import Job from './models/Job.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();



const app = express();

app.use(cors({
  origin: ['http://localhost:5173'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Optional, only if you need cookies/auth in requests
}));
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  app.use(cors({
    origin: ['http://localhost:5173', 'https://your-vite-frontend-url.vercel.app'], // Replace with your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Optional, only if you need cookies/auth in requests
  }));

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

app.get('/users', (req, res) => {
  res.send('User API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
