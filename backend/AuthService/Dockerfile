
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
RUN mkdir /yt/backend/static && mkdir /yt/backend/media && chown -R yt:yt /yt/backend && chmod 755 /yt/backend

# Копируем requirements.txt и устанавливаем зависимости
COPY --chown=yt:yt requirements.txt .

#RUN #--mount=type=cache,target=/root/.cache/pip \
#    python -m pip install -r requirements.txt
RUN python -m pip install -r requirements.txt
# Копируем остальные файлы проекта
COPY --chown=yt:yt CRUDAPI CRUDAPI

# Устанавливаем пользователя по умолчанию
USER yt