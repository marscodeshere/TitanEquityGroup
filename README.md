This is a final project to create a stock website that allows users to participate in a stock exchange.

Admin users will be able to add stocks to the market and keep track of the stocks that exist.

The stock exchange will have limited hours along with other functionality.

This project will be created with React, Github, and AWS technologies for hosting. 

AWS will also be used to create a database for user data and stock information. 

Users will be protected with verification. 

## Titan Equity Group – Mock Server

# This file serves as the mock backend for the Admin Dashboard of Titan Equity Group. It includes:

- Stock data
- Market hours
- Disabled trading dates
- Admin activity logs (login/logout/edit actions)
- Installation (run once per machine)

## Install json-server globally:
  npm install -g json-server

## Run the Mock Server
## Start the server using the following command:
  json-server --watch db.json --port 3001

# Make sure you're in the root directory where db.json is located.

## Available API Endpoints
- Method(s)
- Endpoint
- Description
# GET/POST/PUT/DELETE
http://localhost:3001/stocks
# Stock records

# GET/PUT
http://localhost:3001/marketHours
# Market open/close hours

# GET/POST
http://localhost:3001/disabledDates
# Disabled trading dates

# GET/POST
http://localhost:3001/adminLogs
# Admin activity logs

## Clear Admin Logs
# To reset logs:
Open db.json
Find the "adminLogs" array
Replace it with:
"adminLogs": []
Save the file

## Admin Credentials
# Admins allowed to log in:
ryan@titan.com
caleb@titan.com
marley@titan.com
Password for all: admin123

## These accounts allow full access to the Admin Dashboard and log every action for auditing purposes.

## Project File Structure

project-root/
├── src/
│   └── Admin.js           # Admin dashboard code
├── db.json                # Mock server database
└── README.md              # Documentation (this file)

## Notes
# Admin actions (login, logout, stock edits) are automatically recorded in adminLogs.
# The Admin Dashboard dynamically reads and writes to db.json.
# Dates disabled for trading appear in the UI and can be modified through the Admin panel.

## Last Updated: March 22, 2025