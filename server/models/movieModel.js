const mongoose= require("mongoose");

const movieSchema=mongoose.Schema({
  
  
    movieName: {
        type:String,
       
        required:true,
       
    },
    movieImage: {
        type:String,
       
        required:true,
       
    },
    coverImage:{
        type:String,
       
        required:true,
       
    },
    language: {
        type:String,
       
        required:true,
       
    },
    screenType: {
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
        type:String,
       
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

