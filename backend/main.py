from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Routers
from routes.home_routes import home 
from routes.register_routes import register
from routes.dashboard_routes import dashboard
from routes.login_routes import login
from routes.about_us_routes import about
from routes.posts_routes import posts

origins =[
    'http://localhost:3000'
]

def define_router (app):
    app.include_router(home, prefix="")
    app.include_router(register, prefix="/register")
    app.include_router(dashboard, prefix="/dashboard")
    app.include_router(login, prefix="/login")
    app.include_router(about, prefix="/about-us")
    app.include_router(posts, prefix="/posts")

def mount_router ():

    app = FastAPI()
    define_router(app)
    
    # Allowing communication between frontend and backend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app 

app = mount_router()
