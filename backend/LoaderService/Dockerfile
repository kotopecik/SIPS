FROM python:3.9-slim

ENV PYDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN useradd -ms /bin/bash app-vrsdop

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

RUN python -m pip install --upgrade pip

COPY requirements.txt .

RUN python -m pip install -r requirements.txt

COPY appl appl
COPY ./run.sh run.sh

RUN chown -R app-vrsdop:app-vrsdop /usr/src/app

RUN chmod u+x run.sh

USER app-vrsdop

CMD ["./run.sh"]