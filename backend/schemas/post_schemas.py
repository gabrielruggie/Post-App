from pydantic import BaseModel
from datetime import date, datetime

class Post(BaseModel):
    # Currently the thought process is to allow React to make uuid
    # May change for users too
    title: str 
    message: str 
    date_posted: str 

class DatabasePost(Post):
    id: str
    poster_id: str 
    live: int 

