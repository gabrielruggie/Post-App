from pydantic import BaseModel

'''
Post fields that user fills out in Post App
'''
class Post(BaseModel):
    # Currently the thought process is to allow React to make uuid
    # May change for users too
    title: str 
    message: str 
    date_posted: str 

'''
Extra fields backend fills out before sending to database
'''
class DatabasePost(Post):
    id: str
    poster_id: str 
    live: int 

