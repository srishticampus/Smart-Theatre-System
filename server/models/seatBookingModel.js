const mongoose = require("mongoose")

const schema = mongoose.Schema({
    ticketId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    seatNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true,
    },
    seatLabel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "screens",
        required: true,
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "showtimes",
        required: true,
    },
  
    
    status: {
        type: Boolean,
        default: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    movieDate: {
        type: Date,
        required: true
    },

});
module.exports = mongoose.model('seatbookings', schema)