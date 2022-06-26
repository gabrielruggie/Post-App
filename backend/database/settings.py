import os
from dotenv import load_dotenv
from pathlib import Path

# Loads the .env file contents
dotenv_path = Path('security/.env')
load_dotenv(dotenv_path=dotenv_path)


class SystemSettings:
    MYSQL_USER : str = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_HOST : str = os.getenv('MYSQL_HOST',default="localhost")
    MYSQL_DATABASE : str = os.getenv('MYSQL_DATABASE')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    SECRET_KEY: str = os.getenv('SECRET_KEY')
    ALGORITHM: str = os.getenv('ALGORITHM')


settings = SystemSettings()