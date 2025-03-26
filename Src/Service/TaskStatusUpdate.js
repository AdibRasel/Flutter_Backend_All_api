const mongoose = require("mongoose");

const TaskStatusUpdate = async (Request, DataModel) => {
    const { id, status } = Request.params; 
    let UserID = Request.headers['userid'];

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { status: "fail", message: "Invalid Task ID" };
        }

        const existingTask = await DataModel.findById(id);
        if (!existingTask) {
            return { status: "fail", message: "Task not found" };
        }

        // Only update if the status has actually changed
        if (existingTask.status === status) {
            return { status: "success", message: "NoChanges" };
        }
        const result = await DataModel.updateOne(
            { _id: id, UserID: UserID },
            { $set: { status: status, updatedAt: new Date() } }
        );
        
        if (result.modifiedCount === 0) {
            return { status: "fail", message: "No matching document found or no changes made" };
        }

        if (result.modifiedCount === 0) {
            return { status: "success", message: "NoChanges" };  // If no changes were made
        }

        return { status: "success", message: "Document updated successfully", data: result };

    } catch (error) {
        console.error("Error in Update Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = TaskStatusUpdate;
