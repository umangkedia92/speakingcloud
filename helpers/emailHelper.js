var nodemailer = require('nodemailer');

module.exports = function emailHelper(html,email) {

var responsemessage = ``;

var transporter = nodemailer.createTransport({
		  host: "smtp.gmail.com",
		  secureConnection: false,
          port: 587,
          requiresAuth: true,
          domains: ["gmail.com", "googlemail.com"],
	  auth: {
		  //TODO: Add Id & Password here
		user: 'allizzreal@gmail.com',
		pass: 'youtuber7'
	 }
  });

var mailOptions = {
		 //TODO: Change from Id and pick "To" & s3 bucket url from DB
	  from: 'allizzreal@gmail.com',
	  to: email,
	  subject: 'Sending Email using Alexa Skill',
	  html: html
	};
transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	  responsemessage += `unsuccessful. Please contact system administrator if problem persist.`;
		console.log(error);
	  } else {
	  responsemessage += `successful. PLease check you email.`;
		console.log('Email sent Succesfully');
	  }
	});
	return responsemessage;
};
