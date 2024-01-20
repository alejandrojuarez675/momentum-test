# MOMENTUM TEST
## WHAT DID I HAVE TO DO?
The examen statement is on [this doc.](EXAM-STATEMENT.md)

## HOW TO RUN?

### Set OPENAI_API_KEY
First of all, you have to setup your OPENAI_API_KEY in your computer. For more information go to this [link](https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key).

### Run MongoDB locally

You need a MongoDb running locally

    docker run -d -p 27017:27017 --name=mongo-example mongo:latest

### Run the app
To run this application, you need to run:

    $ npm i && npm run build && npm start

This command install, build to Js and start the application.