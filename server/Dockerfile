FROM python:3-alpine3.6

RUN apk add --no-cache gcc musl-dev

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY crontab /var/spool/cron/crontabs/root
COPY . .

CMD crond && python run.py
