const Alexa = require('alexa-sdk');

const states = {
    SEARCHMODE: '_SEARCHMODE',
    DESCRIPTION: '_DESKMODE',
};

//OPTIONAL: replace with "amzn1.ask.skill.[your-unique-value-here]";
//let APP_ID = "amzn1.ask.skill.033d08e5-6bc2-437e-b8a1-8be1b238f655";


// Skills name
const skillName = "Digital Assistant";

// Message when the skill is first called
const welcomeMessage = "You can ask for the Employees today. Search for Employees or fetch performance reports by date. or say help. What would you like? ";

// Message for help intent
const HelpMessage = "Here are some things you can say: Find Umang. Find Performance of Umang in Quarter 1.";

const descriptionStateHelpMessage = "Here are some things you can say: Pull out the performance of Umang";

// Used when there is no data within a time period
const NoDataMessage = "Sorry there aren't any Employees and reports. Would you like to try again?";

// Used to tell user skill is closing
const shutdownMessage = "Ok see you again soon.";

// Used when an event is asked for
const killSkillMessage = "Ok, great, see you next time.";

let output="";
// stores events that are found to be in our date range
let relevantEvents = new Array();

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.033d08e5-6bc2-437e-b8a1-8be1b238f655";
    alexa.registerHandlers(startSearchHandlers);
    alexa.execute();
};

// Adding session handlers
// const newSessionHandlers = {
    // 'LaunchRequest': function () {
        // this.handler.state = states.SEARCHMODE;
        // this.response.speak(skillName + " " + welcomeMessage).listen(welcomeMessage);
        // this.emit(':responseReady');
    // },
    // "userDetailIntent": function()
    // {
        // this.handler.state = states.SEARCHMODE;
        // this.emitWithState("userDetailIntent");
    // },
    // 'Unhandled': function () {
        // this.response.speak(HelpMessage).listen(HelpMessage);
        // this.emit(':responseReady');
    // },
// };

// Create a new handler with a SEARCH state
const startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
   
    'AMAZON.RepeatIntent': function () {
        this.response.speak(output).listen(HelpMessage);
    },

    'userDetailIntent': function () {
        // Declare variables
        let eventList = new Array();
        const slotValue = this.event.request.intent.slots.users.value;
        if (slotValue != undefined)
        {
            this.response.speak(slotValue + " is a Employee of Deloitte with BTA as the designation");
			this.emit(':responseReady');
            
        }
        else{
            this.response.speak("I'm sorry. I did not get that").listen("I'm sorry. I did not get that");
        }

        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.response.speak(output).listen(output);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killSkillMessage);
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killSkillMessage);
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        this.response.speak(HelpMessage).listen(HelpMessage);
        this.emit(':responseReady');
    }
});

