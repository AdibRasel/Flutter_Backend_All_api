const express = require('express');
const CRUDController = require("../Controller/CRUDController");
const TaskManagerController = require("../Controller/TaskManagerController");

const Router = express.Router();


//api link
// https://flutter-backend-all-api.onrender.com/api/v1/



// =========================== CRUD Operation Start ===========================


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

// =========================== CRUD Operation End ===========================









// =========================== Task Manager End ===========================

// Registration
Router.post("/registration", TaskManagerController.Registration);

// Login
Router.post("/login", TaskManagerController.Login);







// =========================== Task Manager End ===========================










module.exports = Router;
