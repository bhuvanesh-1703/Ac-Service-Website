const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  problem: {
    type: String,
    required: true,
    trim: true,
  },
  technician: {
    type: String,
    default: 'System Assigned',
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'assigned', 'completed', 'cancelled'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
