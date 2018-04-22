FROM python:3-alpine3.6

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY crontab /var/spool/cron/crontabs/root
