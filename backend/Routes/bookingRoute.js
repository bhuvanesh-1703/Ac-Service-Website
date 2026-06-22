const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings.' });
  }
});

// Update booking status or technician
router.patch('/:id', async (req, res) => {
  const { status, technician } = req.body;
  const updateData = {};
  if (status) updateData.status = status;
  if (technician) updateData.technician = technician;

  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found.' });
    }
    res.json({ success: true, booking, message: 'Booking updated successfully!' });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
