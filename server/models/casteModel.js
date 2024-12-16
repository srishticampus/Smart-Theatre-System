const mongoose=require("mongoose")

const Adminschema=mongoose.Schema({
    castImage:{
        type:Object,
        
    },
    role:{
        type:String,
    
    },
    castName:{
        type:String,
        
    },
    movieId:{
      
               type: mongoose.Schema.Types.ObjectId,
               ref:"movies",
              
      
    }

});
module.exports=mongoose.model('casts',Adminschema)