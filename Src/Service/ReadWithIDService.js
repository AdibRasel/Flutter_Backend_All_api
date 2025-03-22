const mongoose = require("mongoose");

const ReadWithIDService = async (Request, DataModel) => {
    try {
        const { id } = Request.params; 

        if (!id) {
            return { status: "fail", message: "Missing id in request" };
        }

        // Find the document that matches the given id
        const data = await DataModel.findById(id);

        if (!data) {
            return { status: "fail", message: "No matching document found" };
        }

        return { status: "success", data };

    } catch (error) {
        console.error("Error in ReadWithIDService Service:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = ReadWithIDService;
