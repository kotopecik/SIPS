
# Базовый образ Python
FROM python:3.9-slim

SHELL ["/bin/bash", "-c"]

# Переменные виртуального окружения
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

# Создаем нового пользователя
RUN useradd -rms /bin/bash yt && chmod 777 /opt /run

# Указываем рабочую директорию внутри контейнера
WORKDIR /yt/backend

RUN mkdir -p /yt/backend/CRUDAPI/static && mkdir /yt/backend/CRUDAPI/media && chown -R yt:yt /yt/backend/CRUDAPI && chmod 755 /yt/backend/CRUDAPI

# Копируем requirements.txt и устанавливаем зависимости
COPY --chown=yt:yt requirements.txt .
COPY --chown=yt:yt run.sh .

RUN chmod u+x run.sh

RUN python -m pip install -r requirements.txt
# Копируем остальные файлы проекта
COPY --chown=yt:yt CRUDAPI CRUDAPI

# Устанавливаем пользователя по умолчанию
USER yt

