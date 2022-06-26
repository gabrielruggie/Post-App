from fastapi import APIRouter, responses, status, HTTPException
from schemas.user_schema import User
from database.mysql_connectors import MySQLConnectors
from security.user_verification import UserVerification as UV
from routes.security_routes import *

login = APIRouter()

@login.post("/")
async def user_login (user: User):
    
    username = user.username

    user_found = MySQLConnectors.retrieve_from_user_table(username=username)

    try:
        # Verifies that data matches data in database
        UV.verify_user_credentials(user_found, user.password)

        response = responses.RedirectResponse("/dashboard", status_code=status.HTTP_302_FOUND)

        create_token_off_login(response=response, user_data=user_found)

        return response
    
    except HTTPException as e:
        print(e)

    except Exception as f:
        print(f)

    