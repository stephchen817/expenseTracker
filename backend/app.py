from flask import Flask, request, redirect, render_template
from flask_cors import CORS
from queries import fetch_all, create_expsense, update_expense, delete_expense, sum_expenses

app = Flask(__name__)
CORS(app)

@app.route('/test')
def display():
    return 'Hello, World!'

# Retrieves all records from the database
@app.route('/fetchAllRecords', methods=['GET'])
def fetch_all_records():
    response = fetch_all()
    return response

# Insert new record into database
@app.route('/createRecord', methods=['POST'])
def insert_new_record():
    data = request.get_json()
    category = data['category']
    amount = data['amount']
    account = data['account']
    description = data['description']
    response = create_expsense(category, amount, account, description)
    return response

# Update existing record in the database
@app.route('/editRecord/<id>', methods=['POST'])
def edit_record(id):
    data = request.get_json()
    category = data['category']
    amount = data['amount']
    account = data['account']
    description = data['description']
    print(id, category, amount, account, description)
    response = update_expense(id, category, amount, account, description)
    return response
    
# Delete existing record in the database
@app.route('/deleteRecord/<id>',  methods=['DELETE'])
def delete_record(id):
    response = delete_expense(id)
    return response

@app.route('/getSum', methods=['GET'])
def sum_of_expenses_record():
    response = sum_expenses()
    return response

if __name__ == '__main__':
    app.run(debug=True)
