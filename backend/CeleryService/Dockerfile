FROM python:3.9-slim

ENV PYDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN useradd -ms /bin/bash app-vrsdop

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

RUN python -m pip install --upgrade pip

COPY CompositeDataRESTAPIService/requirements.txt .

#COPY CeleryService/run.sh .

RUN python -m pip install -r requirements.txt

COPY CeleryService/ CeleryService/.
COPY CompositeDataRESTAPIService CompositeDataRESTAPIService/.

RUN chown -R app-vrsdop:app-vrsdop /usr/src/app

RUN chmod u+x CeleryService/run.sh

USER app-vrsdop

CMD ["./CeleryService/run.sh"]