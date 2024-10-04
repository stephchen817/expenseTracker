import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASSWORD")
host = os.getenv("DATABASE_HOST")

# Database connection
def get_db_connection():
    db_connection = psycopg2.connect(
        dbname = dbname,
        user = user,
        password = password,
        host = host
    )
    return db_connection