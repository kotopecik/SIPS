import os

from dotenv import load_dotenv


load_dotenv()

# Rabbitmq settings
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT"))
RABBITMQ_VIRTUALHOST = os.getenv("RABBITMQ_VIRTUALHOST")
RABBITMQ_USERNAME = os.getenv("RABBITMQ_USERNAME")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD")