const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  specialization: {
    type: [String],
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'reviewed', 'contacted', 'rejected', 'hired'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
