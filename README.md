# Expense Tracker Web App
*A simple web application that keeps track of expenses. It uses Flask for the back-end, React JS for the front-end and Postgresql for the database.*

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Structure](#database-structure)
- [Running the Application](#running-the-application)


## Features
- Can *add, edit, view,* and delete expenses
- Displays the summary (total) of the expenses

## API Endpoints
- ``` GET /fetchAllRecords ```: Fetch all expense records.
- ``` POST /createRecord ```: Create a new expense record.
- ``` POST /editRecord/<id> ```: Edit an existing expense record.
- ``` DELETE /deleteRecord/<id> ```: Delete an expense record.
- ``` GET /getSum ```: Get the total sum of expenses.
  
## Prerequisites
Please make sure that you have the following installed in your machine:
- [Node.js](https://nodejs.org/) (for running the frontend)
- [Python 3.x](https://www.python.org/) (for running the backend)
- [PostgreSQL](https://www.postgresql.org/) (for the database)
- [pgAdmin](https://www.pgadmin.org/) (for managing the PostgreSQL database)
  
## Setup Instructions
### 1. Clone the repository
### 2. Setup the backend
  -  Navigate to the backend by typing ``` cd backend ```.
  - Create a virtual environment in python by typing ``` python -m venv venv ```.
  - Activate the virtual environment:
      - If you're using **Windows**, type the command ``` venv\Scripts\activate ``` in your terminal.
      - If you're using **macOS / Linux**, type the command ``` source venv/bin/activate ``` in your terminal.
  - Install the required packages by running ``` pip install -r requirements.txt ``` in your terminal.
### 3. Setup the frontend
  - Navigate to the folder where the React app is set up. Type ``` cd frontend/expense-tracker ```.
  - Install required packages by typing `` npm install  ``` in your terminal.
### 4. Setup the database
  * To access the database that I have made on my local: *
    - Create a new server connection with the following settings:
      Host: ``` localhost ```
      Database: ``` expenseTracker ```
      Username: ``` postgres ```
      Password: ``` password (or your configured password) ```
  * In case the connection fails, kindly recreate the database: *
    - Create a new PostgreSQL database using pgAdmin or the command line.
    - Update the .env file in the backend directory with your database credentials.

## Database Structure
  * For reference, the database on my local has the following columns *
    - ``` expense_id ``` : Primary key, required, auto-generated every time a user adds a record.
    - ``` category_name ``` : required; (sample values: "Health", "Transportation", "Food", "Bills")
    - ``` amount ``` : required, uses money data type, can handle decimal values (xxx.xx)
    - ``` account_type ``` : required; (sample values: "E-Wallet", "Credit Card", "Debit Card", "Cash")
    - ``` description ``` : optional

## Running the Application
### 1. Start the backend:
  - Navigate to the backend by typing ``` cd backend ```.
  - Type ``` flask run ``` in your terminal.
### 2. Start the frontend:
  - Navigate to the folder where the React app is set up. Type ``` cd frontend/expense-tracker ```.
  - Type ``` npm start ``` in your terminal.

