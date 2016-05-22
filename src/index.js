'use strict';

/**
 *  Daily Hunt
 * 
 * 
 *  One-shot model:
 *  User: "Alexa, what's trending on Product Hunt?"
 *  Alexa: "Here are the top two products: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

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
var dailyHunt = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
dailyHunt.prototype = Object.create(AlexaSkill.prototype);
dailyHunt.prototype.constructor = dailyHunt;

dailyHunt.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
    console.log("dailyHunt onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

dailyHunt.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
    console.log("dailyHunt onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleGetTopRequest(response);
};

dailyHunt.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
    console.log("dailyHunt onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

dailyHunt.prototype.intentHandlers = {
    "GetTopProductsIntent": function(intent, session, response) {
        handleGetTopRequest(response);
    },

    "AMAZON.HelpIntent": function(intent, session, response) {
        response.ask("You can ask Daily Hunt what's trending on Product Hunt, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function(intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function(intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Get top products return to the user.
 */
function handleGetTopRequest(response) {
    // Create speech output
    /** 
     * Load the Product Hunt wrapper
     * https://github.com/danillouz/product-hunt
     */
    const productHunt = require('product-hunt');

    /**
     * Retrieve today's popular products 
     */
    const getProductsPromiseToday = productHunt.today().popular().exec();
    var today = 1;
    getProductsPromiseToday
        .then(function productsFetcher(products) {
            if (products == null) {
                today = 0;
                return;
            }
            var count = 0,
                i = 0,
                topProducts = [];
            while (count != 3) {
                if (products[i].category_id == 1) {
                    topProducts[i] = [products[i].name, products[i].tagline];
                    count++;
                }
                i++;
            }
            var speechOutput = "Here are the top two products: " + topProducts[0][0] + topProducts[0][1] + " and " + topProducts[1][0] + topProducts[1][1];
            response.tellWithCard(speechOutput, "dailyHunt", speechOutput);
        });
    if (!today) {
        const getProductsPromiseYesterday = productHunt.yesterday().popular().exec();
        getProductsPromiseYesterday
            .then(function productsFetcher(products) {
                var count = 0,
                    i = 0,
                    topProducts = [];
                while (count != 3) {
                    if (products[i].category_id == 1) {
                        topProducts[i] = [products[i].name, products[i].tagline];
                        count++;
                    }
                    i++;
                }
                var speechOutput = "Here are the top two products: " + topProducts[0][0] + topProducts[0][1] + " and " + topProducts[1][0] + topProducts[1][1];
                response.tellWithCard(speechOutput, "dailyHunt", speechOutput);
            });
    }
}

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the dailyHunt skill.
    var dailyHunt = new dailyHunt();
    dailyHunt.execute(event, context);
};
