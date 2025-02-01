const mongoose = require("mongoose")

const schema = mongoose.Schema({
    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true,
    },
    screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "screens",
        required: true,
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "showtimes",
        required: true,
    },
    seatNumber:  [{
            Type:String,
            number:Number,
            label:String
        }]
    ,
    paymentStatus: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    amount: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    movieDate: {
        type: Date,
        required: true
    },

},{timestamp:true});
module.exports = mongoose.model('tickets', schema)