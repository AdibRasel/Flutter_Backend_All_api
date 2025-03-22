const mongoose = require("mongoose");

const AllDataListService = async (DataModel) => {
    try {
        // Fetch all documents from the collection
        const data = await DataModel.find();

        if (data.length === 0) {
            return { status: "fail", message: "No data found" };
        }

        return { status: "success", data };

    } catch (error) {
        console.error("Error in AllDataListService:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = AllDataListService;
