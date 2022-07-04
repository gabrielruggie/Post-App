from fastapi import APIRouter, responses, HTTPException
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
        verification_payload = UV.verify_user_credentials(user_found, user.password)

        if verification_payload["result"] == "Failed to Verify User":
            return responses.JSONResponse(verification_payload)

        # Redirect to homepage for now
        response = responses.JSONResponse(verification_payload)

        token = create_token_off_login(response=response, user_data=user_found)
        print(token)
        return response
    
    except HTTPException as e:
        print(e)

    except Exception as f:
        print(f)

    