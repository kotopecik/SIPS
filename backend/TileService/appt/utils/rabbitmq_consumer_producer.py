import pika

import appt.conf as conf


connection_params = pika.ConnectionParameters(
    host=conf.RABBITMQ_HOST,  # Замените на адрес вашего RabbitMQ сервера
    port=conf.RABBITMQ_PORT,          # Порт по умолчанию для RabbitMQ
    virtual_host=conf.RABBITMQ_VIRTUALHOST,   # Виртуальный хост (обычно '/')
    credentials=pika.PlainCredentials(
        username=conf.RABBITMQ_USERNAME,  # Имя пользователя по умолчанию
        password=conf.RABBITMQ_PASSWORD   # Пароль по умолчанию
    )
)

exchange = "tiles_exchange"
queue_name = "tiles_queue"
routing_key = "tiles.key"


def on_tiles_message(ch, method, properties, body):
    """
    output_data_dir - directory with tiles.
    body format = {
        "output_data_dir": output_data_dir
    }
    """
    # your code

    print(f"Received: {body}")


# Установка соединения
with pika.BlockingConnection(connection_params) as connection:

    # Создание канала
    with connection.channel() as channel:

        channel.exchange_declare(exchange=exchange, exchange_type="direct")
        channel.queue_declare(queue=queue_name)
        channel.queue_bind(queue=queue_name, exchange=exchange, routing_key=routing_key)

        channel.basic_consume(queue=queue_name, on_message_callback=on_tiles_message, auto_ack=True)

        print('Waiting for messages. To exit, press Ctrl+C')
        channel.start_consuming()