const mongoose = require("mongoose");
const OTPSchema = mongoose.Schema({
    UserEmail:{type:String},
    UserName:{type:String},
    Otp:{type:String},
    Status:{type:Number, default:0},
    createdDate:{type:Date, default:Date.now()}
}, {versionKey: false});

const OTPModel = mongoose.model("OTPModel", OTPSchema);
module.exports= OTPModel; 