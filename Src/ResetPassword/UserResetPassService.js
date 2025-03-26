const OTPModel = require("./OTPModel");

const UserResetPassService = async (Request, DataModel) => {
    const email = Request.body["Email"];
    const OTPCode = Request.body["OTP"];
    const NewPass = Request.body["NewPassword"];

    try {
        // ধাপ ১: OTP চেক করা হবে এবং এর স্ট্যাটাস পাওয়া যাবে
        const OTPUsedCount = await OTPModel.findOne(
            { UserEmail: email, Otp: OTPCode },
            { Status: 1 }
        );

        if (!OTPUsedCount) {
            return { status: "fail", message: "Invalid OTP or Email" };
        }

        // ধাপ ২: চেক করা হবে OTP আগেই ব্যবহৃত হয়েছে কিনা
        if (OTPUsedCount?.Status !== 1) {
            return { status: "fail", message: "This OTP code has already been used!" };
        }

        // ধাপ ৩: নতুন পাসওয়ার্ডটি পুরানো পাসওয়ার্ডের সমান কিনা তা চেক করা হবে
        const UserData = await DataModel.findOne({ UserEmail: email }, { Password: 1 });

        if (UserData?.Password === NewPass) {
            return { status: "fail", message: "This password is the same as the old password!" };
        }

        // ধাপ ৪: পাসওয়ার্ড আপডেট করা হবে
        const PassUpdate = await DataModel.updateOne(
            { email: email }, 
            { $set: { password: NewPass } }
        );

        if (!PassUpdate.acknowledged || PassUpdate.modifiedCount === 0) {
            return { status: "fail", message: "Password update failed!" };
        }

        // ধাপ ৫: OTP স্ট্যাটাস আপডেট করা হবে (যাতে এটি পুনরায় ব্যবহার করা না যায়)
        await OTPModel.updateOne(
            { UserEmail: email, Otp: OTPCode },
            { $set: { Status: 2 } } // 2 = Used
        );

        return {
            status: "success",
            message: "Password updated successfully!"
        };

    } catch (error) {
        console.error("Error:", error);
        return { status: "fail", message: "An error occurred", error: error.toString() };
    }
};

module.exports = UserResetPassService;
