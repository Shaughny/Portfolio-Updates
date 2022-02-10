const nodemailer = require('nodemailer');
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmails = async (name: string, portfolioData: string, email: string) => {
    const today: string = new Date().toDateString();
    let info = await transporter.sendMail({
        from: `<${process.env.EMAIL}>`,
        to: email,
        subject: `Portfolio Update, ${today} `,
        html: `<h1><u>${name}'s Portfolio Performance for ${today}</u></h1>\n${portfolioData}`
    })

}



module.exports = {
    sendEmails
}