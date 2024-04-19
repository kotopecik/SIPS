
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(dotenv_path=find_dotenv('.env.local'))
# load_dotenv()

print(os.getenv('POSTGRES_PASSWORD'))

