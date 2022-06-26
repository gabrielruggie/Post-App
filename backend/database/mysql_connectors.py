import mysql.connector
from schemas.user_schema import DatabaseUser
from .settings import settings

class MySQLConnectors:

    @staticmethod
    def send_to_user_table (user: DatabaseUser):

        # try:
            # Sets up MySQL connector
            # connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            # user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            # Sets up MySQL pointer to add to datbase
            # cursor = connection.cursor()
            query = """INSERT INTO usertable (id, firstname, lastname, username, email, password)
                                VALUES (%s, %s, %s, %s, %s, %s);"""

            # Adds user data to database
            # record = (user.username, user.email, user.hashed_password)
            # cursor.execute(insert_query, record)

            # connection.commit()

        # except mysql.connector.Error as e:
        #     print(f"Failed to add resource to data base. Stopped by: {e}")

        # finally:
        #     # Closes connection after insertion is complete
        #     if connection.is_connected():
        #         cursor.close()
        #         connection.close()
    
    @staticmethod
    def retrieve_from_user_table (id: str):
        pass 

    