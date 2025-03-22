const CRUDModel = require("../Model/CRUDModel");
const AllDataListService = require("../Service/AllDataListService");
const CreateService = require("../Service/CreateService");
const DeleteWithID = require("../Service/DeleteWithID");
const ReadWithIDService = require("../Service/ReadWithIDService");
const UpdateWithID = require("../Service/UpdateWithID");

// Create a new record
exports.CreateCrud = async (req, res) => {
    let Result = await CreateService(req, CRUDModel);
    res.status(200).json(Result);
};

// Update a record by ID
exports.UpdateCrud = async (req, res) => {
    let Result = await UpdateWithID(req, CRUDModel);
    res.status(200).json(Result);
};

// Read a record by ID
exports.ReadCrudByID = async (req, res) => {
    let Result = await ReadWithIDService(req, CRUDModel);
    res.status(200).json(Result);
};

// Read all records
exports.AllCrudInfo = async (req, res) => {
    let Result = await AllDataListService(CRUDModel);
    res.status(200).json(Result);
};

// Delete a record by ID
exports.CrudDelete = async (req, res) => {
    let Result = await DeleteWithID(req, CRUDModel);
    res.status(200).json(Result);
};
