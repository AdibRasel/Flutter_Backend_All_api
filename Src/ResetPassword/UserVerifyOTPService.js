const UserVerifyOTPService = async (Request, DataModel) => {
    try {
        const email = Request.params.email;
        const otp = Request.params.otp;

        // ধাপ ১: সঠিক ইমেইল এবং OTP কোডের সাথে OTP পাওয়া যাচ্ছে কিনা চেক করা হবে
        const OTPCount = await DataModel.findOne({ UserEmail: email, Otp: otp, Status: 0 });

        // যদি OTP পাওয়া না যায়
        if (!OTPCount) {
            return { status: "fail", data: "Invalid OTP Code" };
        }

        // ধাপ ২: চেক করা হবে OTP কোড আগে ব্যবহৃত হয়েছে কিনা
        if (OTPCount.Status === 2) {
            return { status: "fail", data: "OTP Code already used" };
        }

        // ধাপ ৩: OTP স্ট্যাটাস 0 (যাচাই করা হয়েছে) আপডেট করা হবে
        await DataModel.updateOne(
            { UserEmail: email, Otp: otp },
            { $set: { Status: 1 } } // 1 মানে OTP ব্যবহার করা হয়েছে
        );

        return { status: "success", data: "OTP Verified Successfully" };

    } catch (error) {
        console.error("Error in UserVerifyOTPService:", error);
        return { status: "fail", data: error.toString() };
    }
};

module.exports = UserVerifyOTPService;
