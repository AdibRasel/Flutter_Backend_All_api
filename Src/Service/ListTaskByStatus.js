const mongoose = require("mongoose");

const ListTaskByStatus = async (Request, DataModel) => {
    try {
        const { status } = Request.params; // Extracting parameters

        let Data = await DataModel.aggregate([
            {
                $match: {
                    status: status
                }
            }
        ]);

        // Check if data is empty
        if (Data.length === 0) {
            return { status: "fail", message: "No data found for the given status" };
        }

        return { status: "success", message: "Tasks retrieved successfully", data: Data };

    } catch (error) {
        console.error("Error in Fetching Tasks:", error);
        return { status: "fail", error: error.message };
    }
};

module.exports = ListTaskByStatus;
