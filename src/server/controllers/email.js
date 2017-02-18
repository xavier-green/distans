var nodemailer = require('nodemailer');
var bluebird = require("bluebird");
let aws = require('aws-sdk');

let transporter = null;

if (process.env.NODE_ENV === 'production') {
	console.log("Using AWS to send email");
	aws.config.loadFromPath('config.json');
	transporter = nodemailer.createTransport({
	    SES: new aws.SES({
	        apiVersion: 'latest'
	    })
	});
} else {
	var transporter = nodemailer.createTransport('smtps://'+process.env.GMAIL_USER.replace("@","%40")+':'+process.env.GMAIL_PASS.replace("@","%40")+'@smtp.gmail.com');
}

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"ContactDistans" <contactdistans@gmail.com>', // sender address
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