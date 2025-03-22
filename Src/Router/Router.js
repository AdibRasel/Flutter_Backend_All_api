const express = require('express');
const CRUDController = require("../Controller/CRUDController");

const Router = express.Router();

// Create a new record
Router.post("/create", CRUDController.CreateCrud);

// Read all records
Router.get("/list", CRUDController.AllCrudInfo);

// Read a record by ID
Router.get("/read/:id", CRUDController.ReadCrudByID);

// Update a record by ID
Router.put("/update/:id", CRUDController.UpdateCrud);

// Delete a record by ID
Router.delete("/delete/:id", CRUDController.CrudDelete);

module.exports = Router;
