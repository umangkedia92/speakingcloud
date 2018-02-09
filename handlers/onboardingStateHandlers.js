var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

// Helpers
var amazonAPI = require('../helpers/amazonAPI');

// Onboarding Handlers
var onboardingStateHandlers = Alexa.CreateStateHandler(constants.states.ONBOARDING, {

  'NewSession': function () {
    // Check for User Data in Session Attributes
    var userName = this.attributes['userName'];
    if (userName) {
      // Change State to Main
      this.handler.state = constants.states.MAIN;
      this.emitWithState('LaunchRequest');
    }
    else {
      // Get Access Token
      var accessToken = this.event.session.user.accessToken;

      // Account Linked
      if (accessToken) {
		//FB.setAccessToken(accessToken);
        // Get User Details from Meetup API
        amazonAPI.GetUserDetails(accessToken)
          .then((userDetails) => {

            // Get Users Name
            var name = userDetails.name;
			
			//Get Users Email Id
			var email =userDetails.email;
			
			//Store Email Id in Session
			this.attributes['userEmail'] = email;
			
            // Store Users Name in Session
            this.attributes['userName'] = name;

            // Change State to MAIN
            this.handler.state = constants.states.MAIN;

            // Welcome User for the First Time
            this.emit(':ask', `Hi ${name}! Welcome to Wingman! your email id is ${email} !. The Skill that gives you all the information about the performance for Deloitte employees. You can ask me about the performance of various employees. What would you like to do?`, 'What would you like to do?');
          })
          .catch((error) => {
            console.log("AMAZON API ERROR: ", error);
            this.emit(':tell', 'Sorry, there was a problem accessing your amazon account details.');
          });
      }
      // Account Not Linked
      else {
        this.emit(':tellWithLinkAccountCard', 'Please link your account to use this skil. I\'ve sent the details to your alexa app.');
      }
    }
  },


  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'SessionEndedRequest': function () {
    // Force State to Save when the user times out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':tellWithLinkAccountCard', 'Please link your account to use this skil. I\'ve sent the details to your alexa app.');
  },

  'Unhandled': function () {
    this.emitWithState('AMAZON.HelpIntent');
  }

});

module.exports = onboardingStateHandlers;
