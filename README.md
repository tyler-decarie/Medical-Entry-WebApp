Application Installation
The following steps assume installation on a localhost machine for development purposes.
Prerequisites
•	Visual Studio Code - https://code.visualstudio.com/
•	NPM - https://www.npmjs.com/get-npm
•	(Optional) MongoDB Compass - https://www.mongodb.com/try/download/compass


1.	Clone the repository from Azure Dev Ops
2.	In both the ./frontend and ./backend directories, run the command “npm install” to install all the packages.
3.	Start the backend first by running the command “npm run dev” inside the ./backend directory
4.	Start the frontend second by running the command “npm start” inside the ./frontend directory
•	The script will let you know that something is currently occupying port 3000, type “Y” on the prompt asking to run on port 3001 instead.
5.	(Optional) Import the provided ./extras/symptoms.json file to the database
6.	Changes to the database can be seen on the Azure CosmosDB by accessing the Data Explorer tab.


For development purposes, a localhost database may be preferable. To use a localhost database, follow these steps:
1.	Launch MongoDB Compass Community
2.	In the New Connection window, click the “Fill in connection fields individually” link
3.	Ensure hostname is localhost and port is 27017.
4.	Hit connect
5.	Inside ./backend/app.js, replace line 62 with the following:
   "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

6.	Save the application, it should automatically restart upon saving
7.	Changes to the database can be seen through the MongoDB Compass Community application


When both the frontend and backend are running, the application can be accessed by navigating to http://localhost:3001. There, the user is can register an account, verify their email, and login to access the dashboard and make, delete and export entries.
