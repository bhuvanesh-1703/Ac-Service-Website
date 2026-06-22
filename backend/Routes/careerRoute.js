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

router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    console.error('Fetch Job Applications Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch application details.'
    });
  }
});

router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: 'Status is required.' });
  }
  try {
    const app = await JobApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }
    res.json({ success: true, application: app, message: 'Status updated successfully!' });
  } catch (error) {
    console.error('Update Job Application Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update application status.'
    });
  }
});

module.exports = router;
