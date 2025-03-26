
const EmailSend = require("./EmailSend");
const OTPModel = require("./OTPModel");

const UserVerifyEmailService = async (Req, DataModel) => {
    let email = Req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    try {
        // Email Account Query
        let userResult = await DataModel.aggregate([
            { $match: { email: email } },
            { $project: { firstName: 1 } }
        ]);

        const forgottenUserName = userResult.length > 0 ? userResult[0].firstName : null;

        if (userResult.length > 0) {
            // OTP Insert
            const OtpPostBody = {
                UserEmail:email,
                UserName:forgottenUserName,
                Otp:OTPCode,
            }
            // let CreateOTP = await OTPModel.create({ email: email, otp: OTPCode });
            let CreateOTP = await OTPModel.create(OtpPostBody);

   
            // Function to generate HTML email content
            const generateEmailHtml = (otpCode, forgottenUserName) => {
                const currentYear = new Date().getFullYear(); // Get the current year dynamically
                return `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                    <tr>
                                        <td align="center" style="background-color: #007bff; color: #ffffff; padding: 15px;">
                                            <h1 style="font-size: 24px; margin: 0;">Task Manager Project - PIN Verification</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; color: #333333; font-size: 16px;">
                                            <p>Dear ${forgottenUserName},</p>
                                            <p>We received a request to reset your password. Use the PIN code below to complete the process:</p>
                                            <div style="text-align: center; margin: 20px 0;">
                                                <span style="font-size: 24px; color: #007bff; font-weight: bold; border: 2px solid #007bff; padding: 10px 20px; border-radius: 8px; display: inline-block;">
                                                    ${otpCode}
                                                </span>
                                            </div>
                                            <p>If you did not request this, please ignore this email.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 20px;">
                                            <img src="https://avatars.githubusercontent.com/u/97701792?v=4" alt="Rasel Hossain Adib" width="80" height="80" style="border-radius: 50%; border: 3px solid #007bff;">
                                            <p style="font-size: 14px; color: #333333; margin-top: 10px;">Best Regards,<br><strong>Rasel Hossain Adib</strong></p>
                                            <p>
                                                <a href="https://www.facebook.com/RaselHossainAdib" target="_blank" style="text-decoration: none; color: #007bff; font-size: 14px; margin-right: 10px;">Facebook</a> |
                                                <a href="https://github.com/AdibRasel" target="_blank" style="text-decoration: none; color: #007bff; font-size: 14px; margin-left: 10px;">GitHub</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 10px; font-size: 12px; color: #777777; background-color: #f4f4f4;">
                                            © ${currentYear} Task Manager Project. All rights reserved.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `;
            };


            const EmailContent = generateEmailHtml(OTPCode, forgottenUserName);
            const EmailSubject = `${OTPCode} is your Task Manager Project account recovery code.`;

            // Send the email
            let SendEmail = await EmailSend(email, EmailContent, EmailSubject);

            return{ status: "Success", SendEmail: SendEmail, ForgetenUserName: forgottenUserName };
        } else {
            return{ status: "Failed", data: "No User Found" };
        }
    } catch (e) {
        return{ status: "Failed", data: "Failed from controller" };
    }

}

module.exports = UserVerifyEmailService