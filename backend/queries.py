import db_connection
from flask import jsonify

fetch_all_query = """ SELECT * from expense """
insert_query = """ INSERT INTO  expense (category_name, amount, account_type, description)
                    VALUES (%s, %s, %s, %s) """
update_query = """ UPDATE expense SET category_name = %s, amount = %s, 
                account_type = %s, description = %s WHERE expense_id = %s"""
delete_query = """ DELETE FROM expense where expense_id = %s """

connection = db_connection.get_db_connection()
cursor = connection.cursor()

# for fetching all records in the database
def fetch_all():
    try: 
        cursor.execute(fetch_all_query)
        records = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Succesfully fetched all records!', 'data': records})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# insert new record in the database
def create_expsense(category_name, amount, account_type, description):
    try:
        cursor.execute(insert_query, (category_name, amount, account_type, description))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Record inserted successfully!'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
# edit record in database
def update_expense(id, category_name, amount, account_type, description):
    try:
        cursor.execute(update_query, (category_name, amount, account_type, description, id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Record edited successfully!'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# delete record in database
def delete_expense(id):
    try:
        cursor.execute(delete_query, (id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Record deleted successfully!'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    