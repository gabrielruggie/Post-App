import uuid
from fastapi import APIRouter, Depends, responses
from database.mysql_connectors import MySQLConnectors
from schemas.post_schemas import Post, DatabasePost
from schemas.user_schema import UserPayload
from routes.security_routes import get_user_from_token

dashboard = APIRouter()

'''
Makes connection to database in order to connect all posts to user dashboard
Route checks user authentication before making such requests
'''
@dashboard.get("/")
async def load_all_posts (user: UserPayload = Depends(get_user_from_token)):
    database_posts = MySQLConnectors.retrieve_all_posts()
    database_posts.update(user.dict())

    return database_posts

'''
Makes connection to database in order to retrieve user specific posts
Route checks user authentication before making such requests
'''
@dashboard.get("/view-user-posts")
async def load_user_posts (user: UserPayload = Depends(get_user_from_token)):
    database_user_posts =  MySQLConnectors.retrieve_post_by_poster_id(user.id)
    return database_user_posts

'''
Send a post object to database
Route checks user authentication before making such requests
'''
@dashboard.post("/create-post")
async def create_post (post: Post, user: UserPayload = Depends(get_user_from_token)):
    
    if len(post.title) == 0 or len(post.date_posted) == 0:
        return responses.JSONResponse({"response":500, "Error":"Either The Title Or Date Box Is Empty!"})

    full_post = DatabasePost(
        id=str(uuid.uuid4()),
        title=post.title,
        message=post.message,
        date_posted=post.date_posted,
        poster_id=user.id,
        live=1
    )

    MySQLConnectors.send_post_to_posttable(full_post)

    try:
        # Lets frontend know that the post was created successfully
        return responses.JSONResponse({"response":200, "redirect":"/dashboard"})
    except Exception as e:
        print(e)
