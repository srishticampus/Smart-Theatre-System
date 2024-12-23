const mongoose = require("mongoose")

const schema = mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        required: true,
    },
    slotNo: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    date: {
        type: Date,
        required: true
    }

});
module.exports = mongoose.model('parking', schema)