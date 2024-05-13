FROM ubuntu:20.04

RUN apt update && \
    apt install python3.9 python3-pip -y && \
    apt-get update && \
    apt-get install -y binutils libproj-dev gdal-bin

ENV PYDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN useradd -ms /bin/bash app-back

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

RUN python -m pip install --upgrade pip

COPY requirements.txt .

RUN python -m pip install -r requirements.txt

COPY appt appt
COPY ./run.sh run.sh

RUN chown -R app-back:app-back /usr/src/app

RUN chmod u+x run.sh

USER app-back

CMD ["./run.sh"]