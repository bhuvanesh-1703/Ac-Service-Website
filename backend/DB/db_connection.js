const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const uri = process.env.MONGODB_URI || '';
        await mongoose.connect(uri);
        console.log('✓ MongoDB Connected');
    } catch (err) {
        console.error('✗ MongoDB Connection Error:', err.message);
    }
};
