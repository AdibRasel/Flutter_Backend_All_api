const mongoose = require("mongoose");

const UserTaskUpdateService = async (Request, DataModel) => {
    try {
        const { id } = Request.params; 
        let UserID = Request.headers['userid'];

        const PostBody = Request.body;

        // Update the document
        const result = await DataModel.updateOne(
            { _id: id, UserID: UserID }, 
            PostBody
        );

        // If no document matched
        if (result.matchedCount === 0) {
            return { status: "fail", message: "No matching document found to update" };
        } 
        
        // If no changes were made
        if (result.modifiedCount === 0) {
            return { status: "success", message: "NoChanges", data: result };
        }

        // If the document was successfully updated
        return { status: "success", message: "Document updated successfully", data: result };

    } catch (error) {
        console.error("Error in Update Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = UserTaskUpdateService;
