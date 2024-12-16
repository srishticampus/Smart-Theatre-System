const mongoose = require("mongoose");

const ScreenSchema = mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"screens",
       
        required: true,
    },
   startTime:{
    type: String,
       
    required: true,
   },
  endTime:{
    type: String,
       
    required: true,
   }
  
});

module.exports = mongoose.model("showtimes", ScreenSchema);
