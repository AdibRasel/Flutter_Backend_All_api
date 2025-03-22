const mongoose = require("mongoose");

const UpdateWithID = async (Request, DataModel) => {


    try {

        const { id } = Request.params; 


        const PostBody = Request.body;

        const result = await DataModel.updateOne({ _id: id }, PostBody);

        if (result.matchedCount === 0) {
            return { status: "fail", message: "No matching document found to update" };
        } else if (result.modifiedCount === 0) {
            return { status: "fail", message: "No changes were made to the document" };
        }

        return { status: "success", message: "Document updated successfully", data: result };

    } catch (error) {
        console.error("Error in Update Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = UpdateWithID;
