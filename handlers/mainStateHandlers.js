var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

var AWS = require("aws-sdk");

//EMail Send
var nodemailer = require('nodemailer');

// Main Handlers
var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {

  'LaunchRequest': function () {
    // Check for User Data in Session Attributes
    var userName = this.attributes['userName'];
    if (userName) {
      // Welcome User Back by Name
      this.emit(':ask', `Welcome back ${userName}! You can ask me about the performance of various employees of Deloitte.`,  `What would you like to do?`);
    } else {
      // Change State to Onboarding:
      this.handler.state = constants.states.ONBOARDING;
      this.emitWithState('NewSession');
    }
  },
   
   'SendMail': function () {
	   
      var transporter = nodemailer.createTransport({
		service: 'gmail',
	  auth: {
		  //TODO: Add Id & Password here
		user: '<send mail id>',
		pass: '<send mail password>'
	  }
    });

	var mailOptions = {
		 //TODO: Change from Id and pick "To" & s3 bucket url from DB
	  from: 'allizzreal@gmail.com',
	  to: 'rishabhjain324@gmail.com',
	  subject: 'Sending Email using Alexa Skill',
	  text: 'Hey, Please find the PDF url https://s3.amazonaws.com/alexa-wingman/Test.pdf '
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ');
	  }
	});
	this.emit(':tell', `Hey ${this.attributes['userName']}. Check mail`, 'DO you need any additional help?');
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent' : function () {
    this.emit(':ask', `You can ask me about the performance of various employees of Deloitte.`,  `What would you like to do?`);
  },
  'Unhandled' : function () {
    this.emit(':ask', `You can ask me about the performance of various employees of Deloitte.`,  `What would you like to do?`);
  }

});

module.exports = mainStateHandlers;
