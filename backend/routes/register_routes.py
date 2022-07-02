import uuid
from fastapi import APIRouter, Request, responses, status
from schemas.user_schema import FormUser, DatabaseUser
from security.password_hasher import PasswordHasher as PH
from database.mysql_connectors import MySQLConnectors


register = APIRouter()


@register.post("/")
async def regsiter_user (new_user: FormUser):
    
    unique_id = str(uuid.uuid4())

    insert_user = DatabaseUser(
        id=unique_id,
        username=new_user.username,
        password=PH.hash(new_user.password),
        firstname=new_user.firstname,
        lastname=new_user.lastname,
        email=new_user.email
        )
        
    MySQLConnectors.send_to_user_table(insert_user)

    # Send user to login page to login and create web token
    return responses.JSONResponse({"Registration": "Successful"})



