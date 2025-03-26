const mongoose = require("mongoose");

const TaskStatusUpdate = async (Request, DataModel) => {

    const { id,  status} = Request.params; 


    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { status: "fail", message: "Invalid Task ID" };
        }

        const existingTask = await DataModel.findById(id);
        if (!existingTask) {
            return { status: "fail", message: "Task not found" };
        }

        const result = await DataModel.updateOne(
            { _id: id },
            { $set: { status: status, updatedAt: new Date() } } // pdatedAt: new Date()  এটি থাকলে পূর্বের ডাটার সাথে সমান থাকলে ও কাজ করবে। 
            // এই সমস্যার সমাধান উপরে। এটি কাজ করে কিন্তু যখন পূর্বের ডাটা এর সাথে সমান থাকে তখন আপডেট হয় না, যেমন পূর্বে task status ছিলো new, এখন আপডেট করার সময় যদি আবার new দেই তাহলে সমস্যা করে, এর সমাধান দাও
        );

        return { status: "success", message: "Document updated successfully", data: result };

    } catch (error) {
        console.error("Error in Update Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = TaskStatusUpdate;
