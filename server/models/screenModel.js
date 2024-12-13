const mongoose = require("mongoose");

const ScreenSchema = mongoose.Schema({
    screenSize: {
        type: String,
        required: true,
    },
    screenName: {
        type: String,
       
        required: true,
    },
    screenFormat: {
        type: String,
        enum: ["2D", "3D", "IMAX"],
        required: true,
    },
    
        gold: {
            seatCount: {
                type: Number,
                default:0
            },
            seatLabel: {
                type: String,
                
            },
            amount: {
                type: Number,
                default:0
            },
        },
        silver: {
            seatCount: {
                type: Number,
               
            },
            seatLabel: {
                type: String,
               
            },
            amount: {
                type: Number,
                default:0
            },
        },
        platinum: {
            seatCount: {
                type: Number,
               
            },
            seatLabel: {
                type: String,
              
            },
            amount: {
                type: Number,
               
            },
        },
    
});

module.exports = mongoose.model("screens", ScreenSchema);
