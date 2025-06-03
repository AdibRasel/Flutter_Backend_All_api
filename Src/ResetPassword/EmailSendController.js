const EmailSend = require("./EmailSend");

exports.CourseEnrollmentConfirmationEmail = async (req, res) => {
  try {
    const {
      fullName,
      instituteName,
      address,
      mobile,
      email,
      photoUrl, 
    } = req.body;

    const currentYear = new Date().getFullYear();
    const EmailSubject = `Enrollment Confirmation - Thank You for Joining!`;

    const EmailContent = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
              <tr>
                <td align="center" style="background-color: #28a745; color: #ffffff; padding: 20px;">
                  <h2 style="margin: 0;">Enrollment Confirmation</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #333333; font-size: 16px;">
                  <p>Dear <strong>${fullName}</strong>,</p>
                  <p>Thank you for enrolling! Here are the details you submitted:</p>

                  <ul style="list-style: none; padding-left: 0;">
                    <li><strong>Full Name:</strong> ${fullName}</li>
                    <li><strong>Institute Name:</strong> ${instituteName}</li>
                    <li><strong>Address:</strong> ${address}</li>
                    <li><strong>Mobile:</strong> ${mobile}</li>
                    <li><strong>Email:</strong> ${email}</li>
                  </ul>

                  ${photoUrl ? `<p><strong>Your Photo:</strong></p><img src="${photoUrl}" alt="Uploaded Photo" width="100" style="border-radius: 8px; border: 2px solid #28a745;">` : ''}

                  <p style="margin-top: 20px;">We will contact you soon regarding class schedule and further steps.</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px;">
                  <img src="https://avatars.githubusercontent.com/u/97701792?v=4" alt="Rasel Hossain Adib" width="70" height="70" style="border-radius: 50%; border: 2px solid #28a745;">
                  <p style="font-size: 14px; color: #333333; margin-top: 10px;">Best Regards,<br><strong>Rasel Hossain Adib</strong></p>
                  <p>
                    <a href="https://www.facebook.com/RaselHossainAdib" target="_blank" style="color: #28a745; text-decoration: none; font-size: 14px; margin-right: 10px;">Facebook</a> |
                    <a href="https://github.com/AdibRasel" target="_blank" style="color: #28a745; text-decoration: none; font-size: 14px; margin-left: 10px;">GitHub</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color: #f1f1f1; padding: 15px; font-size: 12px; color: #888888;">
                  © ${currentYear} ZeroLogy. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    const result = await EmailSend(email, EmailContent, EmailSubject);
    res.status(200).json({ status: "success", message: "Email sent", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Email failed", error: error.message });
  }
};
