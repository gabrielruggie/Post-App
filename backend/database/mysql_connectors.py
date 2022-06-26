from select import select
import mysql.connector
from schemas.user_schema import DatabaseUser
from .settings import settings

class MySQLConnectors:

    @staticmethod
    def send_to_user_table (user: DatabaseUser):
        try:
            # Sets up MySQL connector
            connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            # Sets up MySQL pointer to add to datbase
            cursor = connection.cursor()
            query = """INSERT INTO usertable (id, firstname, lastname, username, email, password)
                                VALUES (%s, %s, %s, %s, %s, %s);"""

            # Adds user data to database
            record = (user.id, user.firstname, user.lastname, user.username, user.email, user.password)
            cursor.execute(query, record)

            connection.commit()

        except mysql.connector.Error as e:
            print(f"Failed to add resource to data base. Stopped by: {e}")

        finally:
            # Closes connection after insertion is complete
            if connection.is_connected():
                cursor.close()
                connection.close()
    
    @staticmethod
    def retrieve_from_user_table (username: str):
        try:
            # Sets up MySQL connector
            connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            cursor = connection.cursor()
            # MySQL selection query
            select_query = """SELECT * FROM usertable WHERE username = %s"""
            # Has to be a tuple in order to query
            cursor.execute(select_query, (username,))
            resource = cursor.fetchall()

            select_user = None
            for column in resource:
                select_user = DatabaseUser(
                        id=column[0],
                        firstname=column[1],
                        lastname=column[2],
                        username=column[3],
                        email=column[4],
                        password=column[5]
                    )

            # Could either be a full user of None
            # The connector is not responsible for handling such cases, just
            # reporting them
            return select_user

        except mysql.connector.Error as e:
            print(f"Failed to select resource from database. Stopped by {e}")

        finally:
            # Closes connection after insertion is complete
            if connection.is_connected():
                cursor.close()
                connection.close()

    