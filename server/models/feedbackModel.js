const mongoose= require("mongoose");

const feedbackSchema=mongoose.Schema({
  
  
    rating: {
        type:Number,
        required:true,
    },
    comment: {
        type:String,
        required:true,
       
    },
    userId: {
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true,
       
    },  

    date:{
        type:Date,
        required:true,
       
    },

});

module.exports=mongoose.model('feedback',feedbackSchema)

