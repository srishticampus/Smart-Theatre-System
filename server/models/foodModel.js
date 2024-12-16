const mongoose=require("mongoose")

const schema=mongoose.Schema({
    foodItem:{
        type:String,
       
        required:true,
    },
   category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    image:{
        type:Object,
        required:true
    },

});
module.exports=mongoose.model('food',schema)