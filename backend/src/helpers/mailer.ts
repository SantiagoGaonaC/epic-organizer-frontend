import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const result = await transporter.sendMail({
      from: `Company <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log({ result });
    return {
      ok: true,
      message: "Email sent! ",
    };
  } catch (error) {
    return {
      ok: false,
      message: " X Error sending email X",
      error: error,
    };
  }
};

export default sendEmail;
