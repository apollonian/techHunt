# Tech Hunt - An Alexa skill for Product Hunt

![Tech Hunt](http://apollonian.me/images/techhunt.png)

## Introduction

With **Tech Hunt** Alexa skill you can discover trending technology products
on Product Hunt from your favorite Amazon Alexa enabled device.  

+ [Go to the website](http://apollonian.me/techhunt)

## Included Files

+ src/techhunt_skill.py - lambda function  
+ speechAssets/techhunt_intent_schema.json - intent schema  
+ speechAssets/techhunt_utterances.txt - utterances  

## Interaction Model

#### Specified Intent
> _User_: Alexa, ask Tech Hunt for top products.  

> _Alexa_: Here are the top tech hunts -  
Unfade, Scan your old printed photos and bring them back to life.  
Otto Radio, Discover podcasts & news you love with the push of a button.  
Comixology Unlimited, Explore 1000s of digital comics & manga for $5.99/month
   
#### Unspecified Intent

>_User_: Open Tech Hunt.
  
> _Alexa_: Tech Hunt helps you discover trending products on Product Hunt. 
You can say 'top posts' to know today's top tech hunts.  

> _User_: Top posts   

> _Alexa_: Here are the top tech hunts -  
Unfade, Scan your old printed photos and bring them back to life.  
Otto Radio, Discover podcasts & news you love with the push of a button.   
Comixology Unlimited, Explore 1000s of digital comics & manga for $5.99/month
   
## Usage

You can run this using AWS Lambda. More on that coming soon.

## Contribute

Make Tech Hunt better!  
Send a [pull](https://github.com/apollonian11/techhunt/compare) request or open an [issue](https://github.com/apollonian/techhunt/issues/new)

## Hugs

+ [Postman](https://www.getpostman.com/) 