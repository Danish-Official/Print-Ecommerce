const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Mailgen = require('mailgen');

dotenv.config();
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const mailController = (req, res) => {
    const { userEmail, userName, status } = req.body;
    console.log(userEmail, userName, status);
    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: userName,
            intro: `Your order has been ${status}.`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Order Status",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).send({
            success: true,
            message: "Mail sent successfully"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}

module.exports = mailController;