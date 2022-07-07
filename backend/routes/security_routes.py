from datetime import datetime,timedelta
from jose import JWTError, jwt
from fastapi import Depends, status, HTTPException, APIRouter, Response
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import timedelta
from typing import Optional
from schemas.user_schema import UserPayload, User
from database.settings import settings
from schemas.security_schemas import OAuth2PasswordBearerWithCookie
from database.mysql_connectors import MySQLConnectors

security = APIRouter()

# Creates a JWT access token that expires in case it is intercepted
def create_token (data: dict(), expires: Optional[timedelta] = None):
    # Grabs user sent my login post request
    user_info = data.copy()
    # If expires is specified, add it to token expiration time
    if expires:
        expiration_time = datetime.utcnow() + expires
    else:
        # Add time if no expiration duration is specified
        expiration_time = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # Add expiration timer to JWT schema
    # NEEDS TO BE 'exp' IN ORDER TO WORK!
    user_info.update({"exp": expiration_time})
    # Create JWT token out of user data and expiration informatin
    security_token = jwt.encode(user_info, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return security_token

@security.post("/token")
def create_token_off_login (response: Response, user_data: OAuth2PasswordRequestForm = Depends()):
    # Defines token expiration timer
    token_expiration_time = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    # Creates access token
    token = create_token(data={"load":user_data.username}, expires=token_expiration_time)
    # Set response to HTTP Cookies
    # response.set_cookie(key="access_token", value=f"Bearer {token}", httponly=True)
    print(token)
    return {"access_token": token, "token_type": "bearer"}

OAuth2Scheme =  OAuth2PasswordBearer(tokenUrl="/login/token")

# This acts as a dependency. Any webpage that requires a logged in user will depend on this
# function to authenticate the current user based on the JWT thats alive
def get_user_from_token (token: str = Depends(OAuth2Scheme)):

    try:
        # Decode the current JWT alive
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        username = payload.get("load")
        # If the JWT does not exist anymore, the user will need to login again
        # Catch this in the method that depended on it
        if username == None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not authorize current user")

    except JWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{e}")

    user = MySQLConnectors.retrieve_from_user_table(username)

    # If the user attempts to login after deleting their account, throw this
    if user == None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User does not exist")

    user_payload = UserPayload(id=user.id, firstname=user.firstname, username=user.username)

    return user_payload