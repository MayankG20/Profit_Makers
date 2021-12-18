##Running the Application:
1) First start the mongodb server
2) cd backend(Switch to backend directory)
3) node server.js
4) cd ..
5) cd frontend
6) npm start
It's Running!!!

## Installing Mongodb:
1) sudo apt-get install gnupg
2) wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
3) echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
4) sudo apt-get update
5) sudo apt-get install -y mongodb-org

## Starting Mongodb:
sudo systemctl start mongod

### Verifying that it has started:
sudo systemctl status mongod

## Stoping Mongodb:
sudo systemctl stop mongod

## Restarting Mongodb:
sudo systemctl restart mongod

## Using Mongodb:
mongo

## commands used in mongo terminal
show dbs;
use <database name of your database(in our case my_db)>
show collections;(gives exercises,users)
db.exercises.find()(gives all the data stored under exercises)
db.users.find()(gives all the data stored under users)
db.users.remove({"name":"mayankg"}) for removing 

## Quitting Mongodb:
quit()

## Command for installing some dependencies:
npm install express cors mongoose dotenv

### Express.js
Fast and lightweight web framework for Node.js

### mongoose
Makes interacting with MongoDB through Node.js simpler

### dotenv
It loads environment variables from a .env file into process.env

### Global package install
npm install -g nodemon(If this doesn't works than try same command with sudo in beginning)

### Nodemon
Tool that develop node.js based app by automatically restarting the node application when file changes in the directory are detected

### api for rating(Beauty-stars)
npm install --save beauty-stars
