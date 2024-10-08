from psycopg2 import OperationalError, InterfaceError, ProgrammingError
import db_connection
import pandas as pd
from flask import jsonify

fetch_all_query = """ SELECT category_name, TO_CHAR(amount::NUMERIC, 'FM₱9,999,999.00'), account_type, 
                        description, expense_id FROM expense ORDER BY expense_id ASC  """
insert_query = """ INSERT INTO  expense (category_name, amount, account_type, description)
                    VALUES (%s, %s, %s, %s) """
update_query = """ UPDATE expense SET category_name = %s, amount = %s, 
                account_type = %s, description = %s WHERE expense_id = %s"""
delete_query = """ DELETE FROM expense where expense_id = %s """
sum_query = """ SELECT to_char(SUM(amount)::numeric, 'FM₱9,999,999.00') FROM expense """


# for fetching all records in the database
def fetch_all():
    connection = None
    cursor = None

    try: 
        connection = db_connection.get_db_connection()
        cursor = connection.cursor()

        cursor.execute(fetch_all_query)
        records = cursor.fetchall()

        records_df = pd.DataFrame(records, columns=['category', 'amount', 'account', 'description', 'expenseId'])
        records_json = records_df.to_json(orient="records")

        return jsonify({'response': 'Succesfully fetched all records!', 'data': records_json})
    
    except (OperationalError, InterfaceError) as e:
        print(f"Database error: {e}")
        
        try:
            connection = db_connection.get_db_connection()
            cursor = connection.cursor()

            cursor.execute(fetch_all_query)
            records = cursor.fetchall()

            records_df = pd.DataFrame(records, columns=['category', 'amount', 'account', 'description', 'expenseId'])
            records_json = records_df.to_json(orient="records")

            return jsonify({'response': 'Succesfully fetched all records!', 'data': records_json})

        except Exception as e:
            print(f"Reconnection failed: {e}")
            return jsonify({'response': 'Failed to fetch records after reconnection attempt.', 'error': str(e)})
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

        
# insert new record in the database
def create_expsense(categoryName, amount, accountType, description):
    connection = db_connection.get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(insert_query, (categoryName, amount, accountType, description))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Record inserted successfully!'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
# edit record in database
def update_expense(id, categoryName, amount, accountType, description):
    connection = db_connection.get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(update_query, (categoryName, amount, accountType, description, id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'response': 'Record edited successfully!'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# delete record in database
def delete_expense(id):
    connection = None
    cursor = None

    try:
        connection = db_connection.get_db_connection()
        cursor = connection.cursor()
        
        cursor.execute(delete_query, [id])
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({'response': 'Record deleted successfully!'}), 204

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def sum_expenses():
    connection = None
    cursor = None

    try: 
        connection = db_connection.get_db_connection()
        cursor = connection.cursor()

        cursor.execute(sum_query)
        sum = cursor.fetchall()

        return jsonify({'response': 'Succesfully fetched sum of expenses!', 'data': sum})
    
    except (OperationalError, InterfaceError) as e:
        print(f"Database error: {e}")
        
        try:
            connection = db_connection.get_db_connection()
            cursor = connection.cursor()

            cursor.execute(sum_query)
            sum = cursor.fetchall()

            return jsonify({'response': 'Succesfully fetched sum of expenses!', 'sum': sum})

        except Exception as e:
            print(f"Reconnection failed: {e}")
            return jsonify({'response': 'Failed to fetch total of expenses after reconnection attempt.', 'error': str(e)})
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()    