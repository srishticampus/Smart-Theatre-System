const mongoose = require("mongoose")

const schema = mongoose.Schema({
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
    
    userId: {
   
           type: mongoose.Schema.Types.ObjectId,
           ref: "users",
           required: true,
       },
  
    date: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('queue', schema)