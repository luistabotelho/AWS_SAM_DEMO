# Description

Small repository to demo how to configure a simple SAM NodeJS application that has one api endpoint which creates a event in a dynamoDB "Events" table and returns all events.

# Usefull Commands

Build: `sam build`

Run Locally: `npm start` // will run a local instance of the api, depends on having dynamoDB running locally and configured

Validate: `sam validate`

Deploy: `sam deploy` // Requires you to have credentials configured for your AWS account