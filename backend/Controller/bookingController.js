const Booking = require('../models/Booking');
const {getIo} = require('../Socket/socket');
const createBooking = async (req, res) => {
    try {
        const { name, phone, address, problem } = req.body;
        const newBooking = new Booking({ name, phone, address, problem });
        await newBooking.save();

        const io =getIo();
        io.emit("newBooking",{_id:newBooking._id,
            name:newBooking.name,
            phone:newBooking.phone,
            address:newBooking.address,
            problem:newBooking.problem,
            status:newBooking.status,
            createdAt:newBooking.createdAt,
            updatedAt:newBooking.updatedAt
        })
        res.status(201).json({ success: true, message:"Booking created successfully!", data: newBooking });
    } catch (err) {
        console.error('Booking create error:', err);
        res.status(500).json({ success: false, error: 'Failed to create booking.' });
    }
}

const getBooking = async (req, res) => {
    try {
        const getBookingData = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings: getBookingData, data: getBookingData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Failed to get booking data.', error });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const deletedData = await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: deletedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Failed to delete booking data.', error });
    }
}

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(id, updates, { returnDocument: 'after' });
        res.status(200).json({ success: true, booking: updatedBooking });
    } catch (error) {
        console.error('Booking update error:', error);
        res.status(500).json({ success: false, error: 'Failed to update booking.' });
    }
}

module.exports = {
    createBooking,
    getBooking,
    deleteBooking,
    updateBooking
}
