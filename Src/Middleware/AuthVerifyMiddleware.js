const jwt = require("jsonwebtoken");

module.exports = async (Req, Res, TaskManagerModel) => {
    try {
        const { email, password } = Req.body; // Get email & password from request body

        // Check if user exists
        const user = await TaskManagerModel.findOne({ email });
        if (!user) {
            return Res.status(404).json({ status: "Not found", message: "User not found" });
        }

        // Check if password matches
        if ( email === user.email && password === user.password) {
            // Generate JWT Token
            const token = jwt.sign(
                { email: user.email, password: user.password }, 
                "SecretKey$$(TaskManager)$$RasalHossain", 
                { expiresIn: "30d" } // Token valid for 30 days
            );

            // Prepare user info
            const userInfo = {
                fullName: `${user.firstName} ${user.lastName}`,
                userId: user._id,
                mobile: user.mobile,
                email: user.email,
                photo: user.photo,
                createdDate: user.createdDate
            };

            return Res.status(200).json({ status: "success", token, userInfo });
        } else {
            return Res.status(400).json({ status: "failed", message: "Invalid password" });
        }

    } catch (error) {
        return Res.status(500).json({ status: "Internal Server Error", message: error.message });
    }
};
