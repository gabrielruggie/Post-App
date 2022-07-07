from fastapi import APIRouter, Depends, responses, status 
from database.mysql_connectors import MySQLConnectors
from schemas.post_schemas import Post, DatabasePost
from schemas.user_schema import UserPayload, User
from routes.security_routes import get_user_from_token
import json


dashboard = APIRouter()

@dashboard.get("/")
async def load_all_posts (user: UserPayload = Depends(get_user_from_token)):
    # Return json object to frontend
    return user # json.dumps(MySQLConnectors.retrieve_all_posts())

@dashboard.get("/post/{id}")
async def get_post (id: str, user: UserPayload = Depends(get_user_from_token) ):
    return json.dumps(MySQLConnectors.retrieve_post_by_id(id))

@dashboard.post("/create-post")
async def create_post (post: Post, user: UserPayload = Depends(get_user_from_token)):
    full_post = DatabasePost(
        id=post.id,
        title=post.title,
        message=post.message,
        date_posted=post.date_posted,
        poster_id=user.id,
        live=1
    )

    MySQLConnectors.send_post_to_posttable(full_post)

    try:
        return responses.RedirectResponse("/dashboard", status_code=status.HTTP_302_FOUND)
    except Exception as e:
        print(e)
