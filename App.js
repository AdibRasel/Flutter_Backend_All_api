//Basic Lib Import
const express = require("express");
const Router = require("./Src/Router/Router");
const App = new express();
const BodyParser = require("body-parser");
const mongoose = require('mongoose');


//Env file config
const DoteEnv = require("dotenv")

DoteEnv.config({ path: "./Config.env" })



// Security Middleware Lib Import
const RateLimiter = require("express-rate-limit");
const Helmet = require("helmet")
const MongoSanitize = require("express-mongo-sanitize");
const Xss = require("xss-clean");
const Hpp = require("hpp");
const Cors = require("cors");




// Security Middleware Implement 
App.use(Cors())
App.use(Helmet())
App.use(MongoSanitize())
App.use(Xss())
App.use(Hpp())


App.use(express.json({ limit: '20mb' }));



// Body Parser Implement 
App.use(BodyParser.json())





// Request Rate Limite 
const Limiter = RateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 Minute
        max: 3000 // 3000 request
    }
)


App.use(Limiter)

App.use(express.urlencoded({ extended: true }));

// Mongo DB Database Connection 
const UserName = process.env.DataBaseUser;
const Password = process.env.DataBasePassword;

const UriOne = `mongodb+srv://${UserName}:${Password}@cluster0.3vyve.mongodb.net/Flutter_Backend_All_api?retryWrites=true&w=majority&appName=Cluster0`;



const UriTwo = "mongodb://127.0.0.1:27017/Flutter_CRUD_Project";

//=====================
mongoose.connect(UriOne, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));



// Backend Host link 
// https://containers.back4app.com/new-container




// API Create, Or Routing Implement
App.use("/api/v1", Router)


// Undefine Route Or Undefine API 
App.use("*", (req, res) => {
    res.status(404)
    res.json(
        {
            Status: "Not Found",
            Data: "Undefine Route Or Rong API"
        }
    )
})



module.exports = App;