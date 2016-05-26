# Tech Hunt - An Alexa skill for Product Hunt

![Tech Hunt](http://apollonian.me/images/techhunt.png)

## Introduction

With **Tech Hunt** Alexa skill you can discover trending technology products
on Product Hunt from your favorite Amazon Alexa enabled device.  

+ [Go to the website](http://apollonian.me/techhunt)  
+ [View on Hackster.io](http://www.hackster.io/)

## Included Files

+ src/techhunt_skill.py - lambda function  
+ speechAssets/techhunt_intent_schema.json - intent schema  
+ speechAssets/techhunt_utterances.txt - utterances  

## Interaction Model

#### Specified Intent
> _User_: Alexa, ask Tech Hunt for top posts.  

> _Alexa_: Here are the top tech hunts -  
Unfade, Scan your old printed photos and bring them back to life.  
Otto Radio, Discover podcasts & news you love with the push of a button.  
Comixology Unlimited, Explore 1000s of digital comics & manga for $5.99/month
   
#### Unspecified Intent

>_User_: Launch Tech Hunt.
  
> _Alexa_: Welcome to Tech Hunt. You can say 'Ask Tech Hunt for top posts' 
to know today's top tech products.  

> _User_: Alexa, ask Tech Hunt for top posts.   

> _Alexa_: Here are the top tech hunts -  
Unfade, Scan your old printed photos and bring them back to life.  
Otto Radio, Discover podcasts & news you love with the push of a button.   
Comixology Unlimited, Explore 1000s of digital comics & manga for $5.99/month
   
## Usage

You can run this using AWS Lambda. More on that coming soon.

## Submission Status

Currently under review.

## Contribute

Make Tech Hunt better!  
Send a [pull](https://github.com/apollonian11/techhunt/compare) request or open an [issue](https://github.com/apollonian/techhunt/issues/new)

## Hugs

API code generated using [Postman](https://www.getpostman.com/) 