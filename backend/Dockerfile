FROM python:3.10.9


SHELL ["/bin/bash", "-c"]

#переменные виртуального окружения
ENV PYTHONDONTWRITEBYTECODE 1 #запрещает внутри контейнера создавать файлы с кэшом
ENV PYTHONUNBUFFERED 1


RUN pip install --upgrade pip

RUN apt update && apt -qy install gcc libjpeg-dev libxslt-dev \
    libpq-dev libmariadb-dev libmariadb-dev-compat gettext cron openssh-client flake8 locales vim

#создаем нового пользователя
RUN useradd -rms /bin/bash yt && chmod 777 /opt /run  #yt - пользователь

#указываем рабочую директорию внутри контейнера
WORKDIR /yt
RUN mkdir /yt/static && mkdir /yt/media && chown -R yt:yt /yt && chmod 755 /yt

#копируем внутрь контейнера
COPY --chown=yt:yt . .

#копируем requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt

USER yt

CMD ["manage.py runserver", "-b", "0.0.0.0:8001", "CRUDAPI.wsgi:application"]