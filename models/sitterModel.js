const mongoose = require("mongoose");

const sitterSchema = new mongoose.Schema({

name : { type : String , required : true},
image : {type  : String, required : true},
experienceLevel:  {type  : String, required : true},
bookedTimeSlots : [
{
    from : {type  : String, required : true},
    to : {type  : String, required : true},
}
] ,

ratePerHour : {type  : Number, required : true},

}, {timestamps : true}

)


const sitterModel = mongoose.model('sitters' , sitterSchema)
module.exports = sitterModel