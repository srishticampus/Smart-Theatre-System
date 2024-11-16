
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    doj: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
  
    contact: {
        type: String,
        required: true
    },
  
    isActive: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        default: true
    },
    profilePic: {
        type: Object,
        required: true
    },
},{timeStamps:true});
module.exports = mongoose.model('staff', schema)