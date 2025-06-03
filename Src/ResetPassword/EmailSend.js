var nodemailer = require('nodemailer');

const DoteEnv = require("dotenv")

DoteEnv.config({path:"./Config.env"})
const EmailAddress = process.env.SendGmailAddress;
const PassWord = process.env.SendGmailPassword;

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EmailAddress, // sender user email  // user: "adibrasel.2022@gmail.com", // sender user email
            pass: PassWord, // sender password  // pass: "ezbj bzbw ycos gfil", // sender password
        },
    });




    let mailOptions = {
        from: 'ZeroLogy Team <adibrasel.com@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        html: EmailText
    };


    return await transporter.sendMail(mailOptions)

}
module.exports = EmailSend