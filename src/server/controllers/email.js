var nodemailer = require('nodemailer');
var bluebird = require("bluebird");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+process.env.GMAIL_USER.replace("@","%40")+':'+process.env.GMAIL_PASS.replace("@","%40")+'@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'contactdistans@gmail.com', // sender address
    to: 'contactdistans@gmail.com', // list of receivers
    subject: '', // Subject line
    html: '' // html body
};

bluebird.promisifyAll(transporter);

function sendEmail(email,subject,content) {
	mailOptions.subject = subject;
	mailOptions.html = content;
	return transporter.sendMailAsync(mailOptions);
}

module.exports = sendEmail;