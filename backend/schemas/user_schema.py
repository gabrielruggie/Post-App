from lib2to3.pytree import Base
from pydantic import BaseModel

class User(BaseModel): 
    id: str
    username: str 

class FormUser(BaseModel):
    firstname: str 
    lastname: str 
    username: str 
    password: str
    email: str 

class DatabaseUser(FormUser):
    id: str
