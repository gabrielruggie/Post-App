from security.password_hasher import PasswordHasher as PH
from fastapi import HTTPException, status
from database.mysql_connectors import MySQLConnectors
from schemas.user_schema import FormUser
import re

'''
User verification class that verifies user registration and login form data
'''
class UserVerification:
    # Regex for checking valid emails
    email_pattern = re.compile("\w+@[a-zA-Z]{0,6}\.[a-zA-Z]{0,4}")
    # Password must contain 1 or more uppercase letters OR 1 or more numbers
    password_pattern = re.compile(".*[A-Z0-9]+.*")

    # Receives user information from MySQL connectors and verifies information
    @staticmethod
    def verify_user_credentials (user, password):
        # If MySQL couldn't find the username in database, then ...
        if user == None:
            return {
                "result":"Failed to Verify User", 
                "INVALID USERNAME":"Username Could Not Be Verified"
                }

        if not PH.verify(password, user.password):
            return {
                "result":"Failed to Verify User",
                "INVALID PASSWORD":"Password Is Invalid"
                }
        
        return {
            "result":"User Verified",
            "redirect":"/dashboard"
            }

    '''
    Checks user registration form fields with regex previous defined and if the fields are empty or not
    '''
    @classmethod
    def check_user_registration_input (cls, user: FormUser):
        errors = []

        user_found = MySQLConnectors.retrieve_from_user_table(user.username)

        if not user_found == None:
            errors.append({"INVALID USERNAME":"Username has already been taken"})

        if not len(user.username) >= 5:
            errors.append({"INVALID USERNAME":"Username Must Be At Least 8 Characters"})
        
        if not cls.check_email(user.email):
            errors.append({"INVALID EMAIL":"Invalid Email"})
        
        if not cls.check_password(user.password) and not len(user.password) >= 8:
            errors.append({"INVALID PASSWORD":"Password Must Contain An Uppercase Letter And A Number"})

        if len(errors) > 0:
            failed_payload = {"result":"Failed to Register User"}
            for error in errors:
                failed_payload.update(error)
            
            return failed_payload
        
        return {
            "result":"User Registered",
            "redirect":"/login"
            }

    '''
    Verifies email with regex
    '''
    @classmethod
    def check_email (cls, initial_email):
        return cls.email_pattern.match(initial_email)
    
    '''
    Verifies password with regex
    '''
    @classmethod
    def check_password (cls, initial_password):
        return cls.password_pattern.match(initial_password)
