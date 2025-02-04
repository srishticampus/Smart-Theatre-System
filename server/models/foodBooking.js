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
    // foodId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "food",
    //     required: true,
    // },
    foodItems: [{ 
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        foodItem: {
            type: String,
            required: true,
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
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },

});
module.exports = mongoose.model('foodbookings', schema)