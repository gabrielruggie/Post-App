from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Routers
from routes.register_routes import register
from routes.dashboard_routes import dashboard
from routes.security_routes import security

origins =['http://localhost:3000']

'''
Creates FastAPI instance and mounts all routes to it
Configures CORS middleware as well
'''
def setup ():
    app = FastAPI()

    app.include_router(register, prefix="/register", tags=["register"])
    app.include_router(dashboard, prefix="/dashboard", tags=["dashboard"])
    app.include_router(security, prefix="/login", tags=["login"])

    # Allowing communication between frontend and backend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app    

app = setup()
