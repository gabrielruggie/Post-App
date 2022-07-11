import mysql.connector
from schemas.user_schema import DatabaseUser
from schemas.post_schemas import DatabasePost
from .settings import settings

class MySQLConnectors:

    '''
    MySQL connector that sends user data to database. Expects user data in form or User Object Schema
    previously defined
    '''
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
    
    '''
    Retrieves the specified user from the database if it exists. Post App only registers unique usernames. This helps 
    retrieve data specifically for the user specified.
    '''
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

    '''
    Retrieves all posts from the database to be displayed on the user dashboard
    '''
    @staticmethod
    def retrieve_all_posts ():
        try:
            # Sets up MySQL connector
            connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            cursor = connection.cursor() 
            # MySQL selection query
            select_query = """SELECT * FROM posttable WHERE live = 1"""
            # Has to be a tuple in order to query
            cursor.execute(select_query)
            resources = cursor.fetchall()

            all_posts = {}
            for column in resources:
                content = {
                    "title":column[1],
                    "message":column[2],
                    "date_posted":column[3]
                }

                all_posts.update({column[0]:content})

            # Create nested dict to easily convert to json later
            return all_posts

        except mysql.connector.Error as e:
            print(f"Failed to select resource from database. Stopped by {e}")

        finally:
            # Closes connection after insertion is complete
            if connection.is_connected():
                cursor.close()
                connection.close()
    
    '''
    Retrieves a post based on the poster's id. This acts as a filter and only returns a list of Post objects 
    that the poster made to the application
    '''
    @staticmethod
    def retrieve_post_by_poster_id (id):
        try:
            # Sets up MySQL connector
            connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            cursor = connection.cursor() 
            # MySQL selection query
            select_query = """SELECT * FROM posttable WHERE poster_id = %s"""
            # Has to be a tuple in order to query
            cursor.execute(select_query, (id,))
            resource = cursor.fetchall()

            # May change this when we are retrieving user specific posts
            # I don't think we will need the id here
            post = {}
            for column in resource:
                content = {
                    "title":column[1],
                    "message":column[2],
                    "date_posted":column[3]
                }

                post.update({column[0]:content})

            # Create nested dict to easily convert to json later
            return post

        except mysql.connector.Error as e:
            print(f"Failed to select resource from database. Stopped by {e}")

        finally:
            # Closes connection after insertion is complete
            if connection.is_connected():
                cursor.close()
                connection.close()
    
    '''
    Writes a Post to the post table in the database. Expects data in form of Post object schema previously
    defined
    '''
    @staticmethod
    def send_post_to_posttable (post: DatabasePost):
        try:
            # Sets up MySQL connector
            connection = mysql.connector.connect(host=settings.MYSQL_HOST, database=settings.MYSQL_DATABASE,
            user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD)

            # Sets up MySQL pointer to add to datbase
            cursor = connection.cursor()
            query = """INSERT INTO posttable (id, title, message, date_posted, poster_id, live)
                                VALUES (%s, %s, %s, %s, %s, %s);"""

            # Adds user data to database
            record = (post.id, post.title, post.message, post.date_posted, post.poster_id, post.live)
            cursor.execute(query, record)

            connection.commit()

        except mysql.connector.Error as e:
            print(f"Failed to add resource to data base. Stopped by: {e}")

        finally:
            # Closes connection after insertion is complete
            if connection.is_connected():
                cursor.close()
                connection.close()
    