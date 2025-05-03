import os
from dotenv import load_dotenv

load_dotenv()
print("DATABASE_URL depuis os.getenv :", os.getenv("DATABASE_URL"))