var nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    send: function (params, callback) {
        var connectOptions = {
            host: 'smtp.sendgrid.net',
            port: 465,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.SENDGRID_API_KEY
            },
            secure: true,
        };
        var transporter = nodemailer.createTransport(connectOptions);
        var mailOptions = {
            from: '"NomadGUARD" <ajmanisameer@gmail.com>',
            to: params['to'],
            subject: params['subject'],
            html: params['html']
        };
        transporter.sendMail(mailOptions, function (err, info) {
            // callback(err, info);
            console.log(err, info)
        });
    }
};