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

// View Staff by ID
const viewShowsByScreenIdForDay = (req, res) => {
    console.log("screenId",req.params.id,req.body.day);
    
    Showtime.find({screenId:req.params.id,day:req.body.day})

        .exec()
        .then(data => {
            console.log("datat  ",data);
            
           
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "Error fetching data", Error: err });
        });
};
const viewShowsById = (req, res) => {
    console.log("screenId",req.params.id);
    
    Showtime.findById({_id:req.params.id})

        .exec()
        .then(data => {
            console.log("datat  ",data);
            
           
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "Error fetching data", Error: err });
        });
};

module.exports={
    addShowtime,
    viewShowsByScreenIdForDay,
    viewShowsById
}