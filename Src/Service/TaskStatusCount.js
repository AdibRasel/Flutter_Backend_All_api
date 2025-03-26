const mongoose = require("mongoose");

const TaskStatusCount = async (Request, DataModel) => {
    try {
        let UserID = Request.headers['userid'];

        // যদি UserID না থাকে, তাহলে কোনো ডাটা রিটার্ন করবে না
        if (!UserID) {
            return { status: "fail", message: "UserID is required" };
        }

        // Ensure UserID is correctly formatted (if stored as ObjectId)
        if (mongoose.Types.ObjectId.isValid(UserID)) {
            UserID = new mongoose.Types.ObjectId(UserID);
        }

        console.log("Searching for UserID:", UserID); // Debugging

        // Aggregation query to count tasks based on their status
        let Data = await DataModel.aggregate([
            { $match: { UserID: UserID } }, // Ensure UserID matches
            {
                $group: {
                    _id: "$status", // Group by status field
                    count: { $sum: 1 } // Count occurrences of each status
                }
            }
        ]);

        // Initialize all statuses with 0
        let statusCounts = {
            Canceled: 0,
            Completed: 0,
            Progress: 0,
            New: 0
        };

        // Process the aggregation result and update counts
        Data.forEach(item => {
            if (statusCounts.hasOwnProperty(item._id)) {
                statusCounts[item._id] = item.count;
            }
        });

        // Return response with counts
        return {
            status: "success",
            message: "Task statuses retrieved successfully",
            data: statusCounts
        };

    } catch (error) {
        console.error("Error in Fetching Tasks:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = TaskStatusCount;
