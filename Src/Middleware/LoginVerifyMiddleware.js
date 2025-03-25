var jwt = require("jsonwebtoken");
module.exports=(Req, Res, Next)=>{
    let Token = Req.headers['token'];
    jwt.verify(Token, "SecretKey$$(TaskManager)$$RasalHossain", function (error, decoded){
        if(error){
            console.log(Token)
            console.log("Unauthorized")
            Res.status(401).json({status:"Unauthorized", Token:Token})
        }else{

            let Email=decoded['Email'];
            let UserRole=decoded['UserRole'];

            // console.log(Email);
            // console.log(decoded);
            console.log( "Current user: " + Email);

            Req.headers.Email = Email;
            Req.headers.UserRole = UserRole;

            Next();

        }
    })
}