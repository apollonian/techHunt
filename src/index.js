/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * One-shot model:
 *  User: "Alexa, what's trending on Product Hunt today?"
 *  Alexa: "Here are the top two products: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Top Hunts.
 */
var top = "ABC, a description of ABC. And, DEF, a description of DEF. ";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * dailyHunt is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var dailyHunt = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
dailyHunt.prototype = Object.create(AlexaSkill.prototype);
dailyHunt.prototype.constructor = dailyHunt;

dailyHunt.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("dailyHunt onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

dailyHunt.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("dailyHunt onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleGetTopRequest(response);
};

dailyHunt.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("dailyHunt onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

dailyHunt.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleGetTopRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Daily Hunt what's trending on Product Hunt, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Get the 'top' string and return to the user.
 */
function handleGetTopRequest(response) {
    // Create speech output
    var speechOutput = "Here are the top two products: " + top;
    response.tellWithCard(speechOutput, "dailyHunt", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the dailyHunt skill.
    var dailyHunt = new dailyHunt();
    dailyHunt.execute(event, context);
};

