from pydantic import BaseModel

'''
Used for user login
'''
class User(BaseModel): 
    username: str
    password: str

'''
Payload when user logs in
'''
class UserPayload(BaseModel):
    id: str 
    firstname: str 
    username: str

'''
Used for when user first registers on app
'''
class FormUser(BaseModel):
    firstname: str 
    lastname: str 
    username: str 
    password: str
    email: str 

'''
Gives form user id to send to database
'''
class DatabaseUser(FormUser):
    id: str
