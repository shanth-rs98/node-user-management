const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shanthrs1998@gmail.com',
      pass: 'xumcmnwnebxysbai'
    }
  });

// async..await is not allowed in global scope, must use a wrapper
async function sendOtpEmail(userName,email,otp) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  

  // send mail with defined transport object
  let info = await transporter.sendMail({
        from: 'shanthrs1998@gmail.com',
        to: email,
        subject: "OTP for your verification",
        // text: 
        html: `<b>Hello ${userName}?</b> your otp is ${otp} <a href="http://localhost:4200/verifyOtp?email=${email}&otp=${otp}">Verify your account</a>`, // html body
  });

}


module.exports = { sendOtpEmail}
