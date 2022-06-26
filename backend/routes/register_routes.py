from urllib import response
import uuid
from fastapi import APIRouter, Request, responses, status
from schemas.user_schema import FormUser, DatabaseUser
from security.password_hasher import PasswordHasher as PH


register = APIRouter()

@register.post("/")
def regsiter_user (request: Request, new_user: FormUser):
    
    unique_id = str(uuid.uuid4())

    insert_user = DatabaseUser(
        id=unique_id,
        username=new_user.username,
        password=PH.hash(new_user.password),
        firstname=new_user.firstname,
        lastname=new_user.lastname,
        email=new_user.email
        )
        
    PH.send_to_user_table(insert_user)

    # Send user to login page to login and create web token
    return responses.RedirectResponse("/", status_code=status.HTTP_302_FOUND)



