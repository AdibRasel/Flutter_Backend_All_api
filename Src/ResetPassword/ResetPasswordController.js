const UserTaskManagerModel = require("../Model/UserTaskManagerModel");
const OTPModel = require("./OTPModel");
const UserResetPassService = require("./UserResetPassService");
const UserVerifyEmailService = require("./UserVerifyEmailService");
const UserVerifyOTPService = require("./UserVerifyOTPService");


// Recover Verify Email setp 1 প্রথমে ইমেইল যাচাই করবে আছে কি না, থাকলে ইমেলে একটি ৬ ডিজিটের কোড পাঠাবে।
// otp মডেলে status কোড 0 করবে। 
exports.RecoverVerifyEmail = async (Req, Res) => {
    let Result = await UserVerifyEmailService(Req, UserTaskManagerModel)
    Res.status(200).json(Result)
};


// Recover Verify OTP setp 2। otp মডেলে গিয়ে ইমেল আর otp যাচাই করবে। 
// otp মডেলে status কোড 1 করবে। 
exports.RecoverVerifyOTP = async (req, res)=>{
    let Result = await UserVerifyOTPService(req, OTPModel)
    res.status(200).json(Result)
}

// Recover Verify OTP & Change Password setp 3
// otp মডেলে গিয়ে খুজবে ইমেল আর otp কোড ঠিক আছে কি না, 
// ঠিক থাকলে পাসওয়ার্ড চ্যঞ্জ করবে সাথে otp মডেলে status কোড আবার 0 করে দিবে।
exports.RecoverResetPass = async (req, res)=>{
    let Result = await UserResetPassService(req, UserTaskManagerModel)
    res.status(200).json(Result)
}