const mongoose = require("mongoose");

const UserUpdateWithID = async (Request, DataModel) => {
    try {
        const { id } = Request.params; 
        let UserID = Request.headers['userid']; // ঠিক করা হয়েছে

        const PostBody = Request.body;

        // Update the document
        const result = await DataModel.updateOne(
            { _id: id, _id: UserID }, 
            PostBody
        );

        if (result.matchedCount === 0) {
            return { status: "fail", message: "No matching document found to update" };
        } 
        
        if (result.modifiedCount === 0) {
            return { status: "success", message: "NoChanges", data: result };
        }

        return { status: "success", message: "Document updated successfully", data: result };

    } catch (error) {
        console.error("Error in Update Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = UserUpdateWithID;
