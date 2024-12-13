const Showtime = require('../models/showTimeModel'); 
const addShowtime= async (req, res) => {
    try {
        const showtimesData = req.body; 
        
        if (!Array.isArray(showtimesData) || showtimesData.length === 0) {
            return res.status(400).json({ message: 'Invalid showtimes data' });
        }

        await Showtime.insertMany(showtimesData); 
        return res.status(201).json({
            status:200, message: 'Showtimes saved successfully' });
    } catch (error) {
        console.error('Error saving showtimes:', error);
        return res.status(500).json({ 
            status:500,
            message: 'Server error while saving showtimes' });
    }
};



module.exports={
    addShowtime
}