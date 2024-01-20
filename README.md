# MOMENTUM TEST

## About the app
This application interacts with the OpenAi API, runs in Node.js using TypeScript, and uses MongoDB as its database. The console is where the user interface and output are located.

The application's hexagonal architecture makes it simple to alter the database or artificial intelligence. Furthermore, since the primary logic is independent of the other logic, adding a REST API in the future is simple with a framework like ExpressJs.


## What did I have to do?
The examen statement is on [this doc.](EXAM-STATEMENT.md)

## How to run the app?

#### Set OPENAI_API_KEY as environment variable
You must first configure your machine with your OPENAI_API_KEY as an environment variable. Visit this [link](https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key) for additional details.

#### Run MongoDB locally

You need a MongoDb running locally, so you can start him with Docker

    docker run -d -p 27017:27017 --name=mongo-example mongo:latest

Or go to [official site of MongoDb](https://www.mongodb.com) to search how to install and run it.

#### Run the app
You must first install NodeJs and Npm in order to use this application. Once you have done so, you can run:

    $ npm i 
    $ npm run build 
    $ npm start

This command install, build to Js and start the application.

If you are a developer and you want to run locally with Nodemoon, you can run:

    $ npm i
    $ npm run dev
