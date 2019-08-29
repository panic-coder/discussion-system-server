## Discussion System

This a simple discussion system where admin can add a topic (no record for admin has been taken). After adding the topic we will be getting all the added topics and we can take the topic id and add comments on the topic to start a discussion.

- Whenever we add a topic we require name and email of the user. We are having a user table if the user is found we link it with the comment and if its not then we register   that email along with name and then get the id and link it with conversation.
- We can reply on any comment that is in the conversation. For that we need same above data along with the id of that conversation for linking


## Requirements

* Node
* MongoDB installed locally

## Common setup to start if the above requirements are fulfilled

Clone the repo and install the dependencies.

git clone https://github.com/panic-coder/discussion-system-server

cd discussion-system-server

npm install

### Normal start
    node server.js

### Nodemon start
    npm run dev

## Create .env with the data below

PORT=3000

NODE_ENV=local

DB=mongodb://localhost:27017/discussion

SECRET=discussion

SALT=10


## Steps to install the requirements in ubuntu machine

### Installing node

#### Step 1 Add Node.js PPA
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

#### Step 2 Install Node.js on Ubuntu
    sudo apt-get install nodejs

#### Step 3 Check Node.js and NPM Version
    node -v
    npm -v 

### Installing mongoDB

#### Step 1 Import the public key used by the package management system.
    wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

#### Step 2 Create a list file for MongoDB
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

#### Step 3 Reload local package database.
    sudo apt-get update

#### Step 4 Install the MongoDB packages.
    sudo apt-get install -y mongodb-org

#### Step 5 Start MongoDB.
    sudo service mongod start

#### Step 6 Verify that MongoDB has started successfully
    [initandlisten] waiting for connections on port 27017





