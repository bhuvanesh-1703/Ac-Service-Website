const express = require('express');
const JobApplication = require('../models/JobApplication');

const router = express.Router();

router.post('/apply', async (req, res) => {
  const { fullName, phone, email, experience, specialization, notes } = req.body;

  if (!fullName || !phone || experience === undefined || !specialization || !specialization.length) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields (Full Name, Phone Number, Experience, and at least one Specialization)'
    });
  }

  try {
    const newApplication = new JobApplication({
      fullName,
      phone,
      email,
      experience: Number(experience),
      specialization,
      notes
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!'
    });
  } catch (error) {
    console.error('Job Application Submit Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to save application details.'
    });
  }
});

module.exports = router;
