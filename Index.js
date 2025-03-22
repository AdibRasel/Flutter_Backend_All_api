const App = require("./App");

const DoteEnv = require("dotenv")

DoteEnv.config({path:"./Config.env"})

const PORT= process.env.RunningPort || 5000;

const HOST = "0.0.0.0"; 

App.listen(PORT,HOST, function(){
    console.log(`Server running at http://192.168.0.100:5000`);
})

//http://192.168.0.100:5000