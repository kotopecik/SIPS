import json

import pika

import appdp.conf as conf
from appdp.utils.start_algorithm import process_raw


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


def on_algorithm_message(ch, method, properties, body):
    """
    input_raw_file - path to input raw file
    body format = {
        "input_raw_file": input_raw_file
    }
    """

    print(f"Received from loader service: '{body}'")
    received_message = json.loads(body.decode())
    output_data_dir = process_raw(received_message["input_raw_file"])

    if output_data_dir:
        data = {
            'output_data_dir': output_data_dir
        }
        sending_message = json.dumps(data)

        channel.basic_publish(exchange="tiles_exchange", routing_key="tiles.key",
                              body=sending_message.encode())


# Установка соединения
with pika.BlockingConnection(connection_params) as connection:

    # Создание канала
    with connection.channel() as channel:

        channel.exchange_declare(exchange=exchange, exchange_type="direct")
        channel.queue_declare(queue=queue_name)
        channel.queue_bind(queue=queue_name, exchange=exchange, routing_key=routing_key)

        channel.basic_consume(queue=queue_name, on_message_callback=on_algorithm_message, auto_ack=True)

        print('Waiting for messages. To exit, press Ctrl+C')
        channel.start_consuming()
