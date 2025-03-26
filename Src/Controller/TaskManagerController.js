
const LoginMiddleware = require("../Middleware/LoginMiddleware");
const TaskModel = require("../Model/TaskModel");
const UserTaskManagerModel = require("../Model/UserTaskManagerModel");
const AllDataListService = require("../Service/AllDataListService");
const CreateService = require("../Service/CreateService");
const DeleteWithID = require("../Service/DeleteWithID");
const ListTaskByStatus = require("../Service/ListTaskByStatus");
const ReadWithIDService = require("../Service/ReadWithIDService");
const TaskStatusCount = require("../Service/TaskStatusCount");
const TaskStatusUpdate = require("../Service/TaskStatusUpdate");
const UpdateWithID = require("../Service/UpdateWithID");
const UserTaskUpdateService = require("../Service/UserTaskUpdateService");
const UserUpdateWithID = require("../Service/UserUpdateWithID");



// Registration
exports.Registration = async (req, res) => {
    let Result = await CreateService(req, UserTaskManagerModel);
    res.status(200).json(Result);
};



// Login
exports.Login = async (req, res) => {
    try {
        await LoginMiddleware(req, res, UserTaskManagerModel);
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: "Login verification failed" });
    }
};




// Profile Update by ID
exports.ProfileUpdate = async (req, res) => {
    let Result = await UserUpdateWithID(req, UserTaskManagerModel);
    res.status(200).json(Result);
};


// Create Task
exports.CreateTask = async (req, res) => {
    let Result = await CreateService(req, TaskModel);
    res.status(200).json(Result);
};


// Task Update
exports.TaskUpdate = async (req, res) => {
    let Result = await UserTaskUpdateService(req, TaskModel);
    res.status(200).json(Result);
};

// Task Status Update
exports.TaskStatusUpdate = async (req, res) => {
    let Result = await TaskStatusUpdate(req, TaskModel);
    res.status(200).json(Result);
};

// Task Status Update
exports.ListTaskByStatus = async (req, res) => {
    let Result = await ListTaskByStatus(req, TaskModel);
    res.status(200).json(Result);
};

// Task Status Count
exports.TaskStatusCount = async (req, res) => {
    let Result = await TaskStatusCount(req, TaskModel);
    res.status(200).json(Result);
};