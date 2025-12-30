// import nodemailer from "nodemailer";

// export const sendLoginSuccessEmail = async (toEmail) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     console.log("EMAIL:", process.env.EMAIL_USER);
// console.log("PASS:", process.env.EMAIL_PASS);


//     await transporter.sendMail({
//       from: `"Tinder App" <${process.env.EMAIL_USER}>`,
//       to: toEmail,
//       subject: "Login Successful ✅",
//       html: `
//         <h2>Login Successful</h2>
//         <p>Your account was logged in successfully.</p>
//         <p>If this wasn't you, reset your password.</p>
//       `,
//     });

//     console.log("✅ Login email sent");
//   } catch (error) {
//     console.log("❌ Email error:", error.message);
//   }
// };







import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendLoginSuccessEmail = async (toEmail) => {
  try {
    const msg = {
      to: toEmail,
      from: process.env.FROM_EMAIL,  // same jo aap forgotPassword me use kar rahe ho
      subject: "Login Successful ✅",
      text: "Your account was logged in successfully.",
      html: `
        <h2>Login Successful</h2>
        <p>Your account was logged in successfully.</p>
        <p>If this wasn't you, please reset your password immediately.</p>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Login email sent via SendGrid");
  } catch (error) {
    console.error("❌ SendGrid login email error:", error.response?.body || error.message);
  }
};
