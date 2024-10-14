# Description

Small repository to demo how to configure a simple SAM NodeJS application. It's function is to receive a message (json format), process the message and make the result available.
It does that with 3 endpoints and 4 functions:
- receive-event.ts (/receive-event?fileName=): Receives the data, stores it in S3 and places an event in a dynamoDB table
- fetch-received.ts (/fetch-received?fileName=): Returns the received data based on the fileName parameter
- fetch-result.ts (/fetch-result?fileName=): Returns the result data after processing
- process.ts: Is triggered by an S3 put object event and processes the received data into the result

# Usefull Commands

Build: `sam build`

Run Locally: `npm start` // will run a local instance of the api, depends on having dynamoDB running locally and configured

Validate: `sam validate`

Deploy: `sam deploy` // Requires you to have credentials configured for your AWS account
