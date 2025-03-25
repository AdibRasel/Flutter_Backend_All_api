
const AuthVerifyMiddleware = require("../Middleware/AuthVerifyMiddleware");
const TaskManagerModel = require("../Model/TaskManagerModel");
const AllDataListService = require("../Service/AllDataListService");
const CreateService = require("../Service/CreateService");
const DeleteWithID = require("../Service/DeleteWithID");
const ReadWithIDService = require("../Service/ReadWithIDService");
const UpdateWithID = require("../Service/UpdateWithID");
// const AuthVerifyMiddleware = require("../../Middleware/AuthVerifyMiddleware.js");



// Registration
exports.Registration = async (req, res) => {
    let Result = await CreateService(req, TaskManagerModel);
    res.status(200).json(Result);
};


// Login
exports.Login = async (req, res) => {
    try {
        await AuthVerifyMiddleware(req, res, TaskManagerModel);
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: "Login verification failed" });
    }
};