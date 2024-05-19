import json

import pika

import appl.conf as conf

connection_params = pika.ConnectionParameters(
    host=conf.RABBITMQ_HOST,  # Замените на адрес вашего RabbitMQ сервера
    port=conf.RABBITMQ_PORT,          # Порт по умолчанию для RabbitMQ
    virtual_host=conf.RABBITMQ_VIRTUALHOST,   # Виртуальный хост (обычно '/')
    credentials=pika.PlainCredentials(
        username=conf.RABBITMQ_USERNAME,  # Имя пользователя по умолчанию
        password=conf.RABBITMQ_PASSWORD   # Пароль по умолчанию
    )
)


exchange = "algorithm_exchange"
queue_name = "algorithm_queue"
routing_key = "algorithm.key"


# Установка соединения
with pika.BlockingConnection(connection_params) as connection:

    # Создание канала
    with connection.channel() as channel:

        channel.queue_declare(queue=queue_name)

        body = {
            "input_raw_file": "input filename"
        }
        json_body = json.dumps(body)

        channel.basic_publish(
            exchange=exchange,
            routing_key=routing_key,
            body=json_body.encode()
        )
