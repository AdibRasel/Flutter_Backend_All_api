const mongoose = require("mongoose");

const UserDeleteWithID = async (Request, DataModel) => {
    try {

        const { id } = Request.params;  // Get the id from the request params
        let UserID = Request.headers['userid'];

        if (!id) {
            return { status: "fail", message: "Missing id in request" };
        }

        // Delete the document that matches the given _id (not id)
        const result = await DataModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), UserID: UserID });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { status: "fail", message: "Invalid ID format" };
        }

        if (result.deletedCount === 0) {
            return { status: "fail", message: "No matching document found to delete" };
        }

        return { status: "success", message: "Document deleted successfully", data: result };

    } catch (error) {
        console.error("Error in Delete Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = UserDeleteWithID;
