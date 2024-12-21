const mongoose= require("mongoose");

const movieSchema=mongoose.Schema({
  
  
    movieName: {
        type:String,
       
        required:true,
       
    },
    movieImage: {
        type:Object,
       
        required:true,
       
    },
    coverImage:{
        type:Object,
       
        required:true,
       
    },
    language: {
        type:String,
       
        required:true,
       
    },
 
    startDate: {
        type:String,
       
        required:true,
       
    },
    endDate: {
        type:String,
       
        required:true,
       
    },
    movieType: {
        type:String,
       
        required:true,
       
    },
    duration: {
        type:String,
       
        required:true,
       
    },
    trailer: {
        type:Object,
       
        required:true,
       
    },
    screenId: {
        type:mongoose.Types.ObjectId,
        ref:'screens',
       
        required:true,
       
    },
    description:{
        type:String,
       
        required:true,
       
    },
   
    isActive:{
        type:Boolean,
        default:false
    },
    
    

});

module.exports=mongoose.model('movies',movieSchema)

