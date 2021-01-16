# Listener-Esports API
This micro service is responsible for taking the data that comes from pandascore, processing and saving it in the database. In addition, it also processes when games change status, and sends this information to ms-esport

# Getting started

### Project Configuration
The first step is to fork the project onto your machine. After fork, enter the project and in its root folder create an `.env` file. In this file, you put all your sensitive and environment info.

The `.env` variables are in this link, section 3: https://www.notion.so/betprotocol/Listener-Esports-82ec88ffb37a48498c81b24892038883

Note: In the link above is also the step by step of what is needed to create an online machine of the entire project in Heroku.

### Project Installation

After creating the `.env` file, we now open a terminal in the project's root folder and install all project dependencies with the command:

    npm install

Finally, we started the project with:

    npm start

### Docs

- Endpoint documentation: https://betprotocol.readme.io/reference
- NodeJS installation: https://nodejs.org/en/
- General documentation BEPRO.NETWORK operation: https://www.notion.so/betprotocol/BEPRO-NETWORK-c3d96d49ccc04f49b07ea9ea8fd5c149

