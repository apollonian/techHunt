import codecs
import json
import requests


def replace_spc_error_handler(err):
    """This fix replaces errors(question marks) by spaces during
    encoding of the response
    """
    return (u' ' * (err.end-err.start), err.end)
codecs.register_error("replace_space", replace_spc_error_handler)


def lambda_handler(event, context):
    """ Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" +
          event['session']['application']['applicationId'])

    if (event['session']['application']['applicationId'] !=
            "amzn1.echo-sdk-ams.app.d012cc18-478b-44e3-9f9d-992c47282e55"):
        raise ValueError("Invalid Application ID")

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])


def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': 'SessionSpeechlet - ' + title,
            'content': 'SessionSpeechlet - ' + output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


def on_session_started(session_started_request, session):
    """ Called when the session starts """
    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """ Called when the user launches the skill without specifying what they
    want
    """
    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # Dispatch to your skill's launch
    return get_welcome_response()


def on_intent(intent_request, session):
    """ Called when the user specifies an intent for this skill """
    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers
    if intent_name == "GetTopProductsIntent":
        return get_products(intent, session)
    elif intent_name == "AMAZON.HelpIntent":
        return get_welcome_response()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    """ Called when the user ends the session.
    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])

# --------------- Functions that control the skill's behavior ------------------


def get_welcome_response():
    """ For when the user doesn't specify the intent
    """
    session_attributes = {}
    card_title = "Welcome to Tech Hunt!"
    speech_output = "Welcome to Tech Hunt. " \
                    "You can say 'Ask Tech Hunt for top posts' to know " \
                    "today's top tech products. "
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "Say 'Ask Tech Hunt for top posts' to know " \
                    "today's top tech products. "
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def get_products(intent, session):
    """Make a request to Product Hunt API and create a string 'out' that
    contains the response with proper punctuations.
    """
    url = "http://api.producthunt.com/v1/posts"
    headers = {
        'accept': "application/json",
        'content-type': "application/json",
        'authorization': "Bearer a9dd8cfa36636e1befe06cd3056b746c67bcacf5453deb07c890e85861152b46",
        'host': "api.producthunt.com",
        'cache-control': "no-cache",
        'postman-token': "96253d08-c7b2-6cfd-45dc-dc7ddbb060cf"
    }
    response = requests.request("GET", url, headers=headers)
    res = (response.text.encode('utf-8', errors='replace_space'))
    parsed_res = json.loads(res)
    len_posts = len(parsed_res['posts'])
    if len_posts > 0:
        prod_1 = parsed_res['posts'][0]['name']+", "+parsed_res['posts'][0]['tagline']+". "
        out = prod_1
        if len_posts >= 2:
            prod_2 = parsed_res['posts'][1]['name']+", "+parsed_res['posts'][1]['tagline']+". "
            out = out+prod_2
        if len_posts >= 3:
            prod_3 = parsed_res['posts'][2]['name']+", "+parsed_res['posts'][2]['tagline']+". "
            out = out+prod_3
    # Incase there are no products today display yesterday's top posts
    if len_posts == 0:
        url = "http://api.producthunt.com/v1/categories/tech/posts"
        querystring = {
            "days_ago": "1"
        }
        headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'authorization': "Bearer a9dd8cfa36636e1befe06cd3056b746c67bcacf5453deb07c890e85861152b46",
            'host': "api.producthunt.com",
            'cache-control': "no-cache",
            'postman-token': "f108f14e-bbe9-f20f-7a04-4ac67dd42d70"
        }
        response = requests.request("GET", url, headers=headers, params=querystring)
        res = (response.text.encode('utf-8', errors='replace_space'))
        parsed_res = json.loads(res)
        prod_1 = parsed_res['posts'][0]['name']+", "+parsed_res['posts'][0]['tagline']+". "
        prod_2 = parsed_res['posts'][1]['name']+", "+parsed_res['posts'][1]['tagline']+". "
        prod_3 = parsed_res['posts'][2]['name']+", "+parsed_res['posts'][2]['tagline']+"."
        out = prod_1+prod_2+prod_3
    session_attributes = {}
    reprompt_text = None
    speech_output = "Here are the top tech hunts: " + out
    should_end_session = True
    return build_response(session_attributes, build_speechlet_response(
        "Top Hunts", speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    """When the session ends, say goodbye!
    """
    card_title = "Tech Hunt Session Ended"
    speech_output = "Goodbye."
    # Setting should_end_session to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))
