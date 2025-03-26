const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
    createdEmail: { type: String },
    createdName: { type: String },
    title: { type: String },
    description: { type: String },
    status: { type: String },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false });

const TaskModel = mongoose.model("Task_Model", DataSchema);
module.exports = TaskModel;
