const express = require('express');
const CRUDController = require("../Controller/CRUDController");
const TaskManagerController = require("../Controller/TaskManagerController");
const ResetPasswordController = require("../ResetPassword/ResetPasswordController");
const LoginVerifyMiddleware = require('../Middleware/LoginVerifyMiddleware');
const { CourseEnrollmentConfirmationEmail } = require('../ResetPassword/EmailSendController');

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

// Profile Update
Router.post("/profileUpdate/:id", LoginVerifyMiddleware, TaskManagerController.ProfileUpdate);

// Create Task
Router.post("/createTask", LoginVerifyMiddleware, TaskManagerController.CreateTask);

// Task Update
Router.post("/taskUpdate/:id", LoginVerifyMiddleware, TaskManagerController.TaskUpdate);


// Task Delete by ID
Router.delete("/taskDelete/:id", TaskManagerController.TaskDelete);

// Only Task Status Update
Router.get("/updateTaskStatus/:id/:status", LoginVerifyMiddleware, TaskManagerController.TaskStatusUpdate);

// Task Status Update
Router.get("/listTaskByStatus/:status", LoginVerifyMiddleware, TaskManagerController.ListTaskByStatus);

// Task Status Update
Router.get("/taskStatusCount", LoginVerifyMiddleware, TaskManagerController.TaskStatusCount);


// ================================ Reset Password Start ============================
// Recover Verify Email setp 1 প্রথমে ইমেইল যাচাই করবে আছে কি না, থাকলে ইমেলে একটি ৬ ডিজিটের কোড পাঠাবে।
// otp মডেলে status কোড 0 করবে। 
Router.get("/RecoverVerifyEmail/:email" , ResetPasswordController.RecoverVerifyEmail)

// Recover Verify OTP setp 2। otp মডেলে গিয়ে ইমেলের  otp যাচাই করবে এবং ইমেল যাচাই করবে। 
// otp মডেলে status কোড 1 করবে। 
Router.get("/RecoverVerifyOTP/:email/:otp", ResetPasswordController.RecoverVerifyOTP);

// Recover Verify OTP & Change Password setp 3
// otp মডেলে গিয়ে খুজবে ইমেল আর otp কোড, সাথে status code 1 আছে কি না, 
// ঠিক থাকলে পাসওয়ার্ড চ্যঞ্জ করবে সাথে otp মডেলে status কোড আবার 0 করে দিবে। 
Router.post("/RecoverResetPass", ResetPasswordController.RecoverResetPass);
// ================================ Reset Password End ============================



// =================================== Only Email Send Start ===============================
Router.post("/CourseEnrollmentConfirmationEmail", CourseEnrollmentConfirmationEmail)
// =================================== Only Email Send End ===============================


// =========================== Task Manager End ===========================










module.exports = Router;
