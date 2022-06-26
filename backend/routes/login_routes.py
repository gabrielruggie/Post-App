from fastapi import APIRouter, responses, status
from schemas.user_schema import User
from database.mysql_connectors import MySQLConnectors
from security.password_hasher import PasswordHasher as PH

class InvalidUserError(Exception):
    pass


login = APIRouter()

@login.post("/")
def user_login (user: User):
    
    username = user.username

    user_found = MySQLConnectors.retrieve_from_user_table(username=username)

    try:

        if user_found == None:
            raise InvalidUserError("User Username Could Not Be Verified")

        if not PH.verify(user.password, user_found.password):
            raise InvalidUserError("User Password Could Not Be Verified")

        response = responses.RedirectResponse("/dashboard", status_code=status.HTTP_302_FOUND)

        # Create Token Here

        return response
    
    except InvalidUserError as e:
        print(e)

    except Exception as f:
        print(f)

    