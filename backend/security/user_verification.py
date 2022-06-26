from security.password_hasher import PasswordHasher as PH
from fastapi import HTTPException

class UserVerification:

    # Receives user information from MySQL connectors and verifies information
    def verify_user_credentials (user, password):
        # If MySQL couldn't find the username in database, then ...
        if user == None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{u}")

        if not PH.verify(password, user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{u}")
