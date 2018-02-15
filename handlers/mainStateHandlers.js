var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

var AWS = require("aws-sdk");

var emailHelper = require('../helpers/emailHelper');

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
	   
	var email = this.attributes['userEmail'];
	   
	var  html = '<h1>Performance Report</h1><h2>ARPAN KUMAR DUBEY</h2><h2>Email : <a href="mailto:arpandubey@gmail.com">arpandubey@gmail.com</a></h2> <h2>Year: 2018</h2><h2>Quarter: 1st</h2><h2>Average Rating : 8.75</h2><h2>Performance Metrics</h2><table><thead><tr><td>Snapshot Id</td></tr></thead><tbody><tr><td>101</td></tr></tbody></table>';
	
	 this.emit(':tell', `Hey ${this.attributes['userName']}. Your request for Performance report is ${emailHelper(html,email)}`, 'How else can I help you?');
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
