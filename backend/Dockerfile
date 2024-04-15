
# Базовый образ Python
FROM python:3.10-slim

SHELL ["/bin/bash", "-c"]

# Переменные виртуального окружения
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

# Установка зависимостей d
#RUN apt-get update && apt-get -y install gcc libjpeg-dev libxslt-dev \
#    libpq-dev libmariadb-dev libmariadb-dev-compat gettext cron openssh-client flake8 locales vim && \
#    rm -rf /var/lib/apt/lists/*

# Создаем нового пользователя
RUN useradd -rms /bin/bash yt && chmod 777 /opt /run

# Указываем рабочую директорию внутри контейнера
WORKDIR /yt
RUN mkdir /yt/static && mkdir /yt/media && chown -R yt:yt /yt && chmod 755 /yt

# Копируем requirements.txt и устанавливаем зависимости
COPY --chown=yt:yt requirements.txt .
RUN pip install -r requirements.txt
#RUN --mount=type=cache,target=/root/.cache/pip \
  #  python -m pip install -r requirements.txt

# Копируем остальные файлы проекта
COPY --chown=yt:yt . .

# Устанавливаем пользователя по умолчанию
USER yt