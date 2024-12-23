const mongoose = require("mongoose")

const schema = mongoose.Schema({
    ticketId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true,
    },

    userId: {
   
           type: mongoose.Schema.Types.ObjectId,
           ref: "users",
           required: true,
       },
  
    movieDate: {
        type: Date,
        required: true
    },

});
module.exports = mongoose.model('foodbookings', schema)