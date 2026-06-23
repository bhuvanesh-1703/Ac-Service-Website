const booking = require('../Models/BookingModel.js');

const createBooking = async (req, res) => {
    try {
        const { name, phone, address, problem } = req.body;
        const booking = new booking({ name, phone, address, problem });
        await booking.save();
        res.status(201).json({ success: true,data:booking });
    } catch (err) {
        console.error('Booking create error:', err);
        res.status(500).json({ success: false, error: 'Failed to create booking.' });
    }
}

const getBooking = async (req,res)=>{
    try {
        const getBookingData = await booking.find()
        res.status(200).json({success:true,data:getBookingData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error:'Failed to get booking data.',error})
    }
}

const deleteBooking = async (req,res)=>{
    try {
        const getBookingData = await booking.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,data:getBookingData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error:'Failed to get booking data.',error})
    }
}

module.exports = {
    createBooking,
    getBooking,
    deleteBooking
}
