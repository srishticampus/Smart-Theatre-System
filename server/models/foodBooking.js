const mongoose = require("mongoose")

const schema = mongoose.Schema({
    ticketId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        required: true,
    },
    // foodId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "food",
    //     required: true,
    // },
    foodItems: [{ 
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],

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