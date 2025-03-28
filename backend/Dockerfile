FROM python:latest

WORKDIR /app

COPY . /app

RUN pip install flask flask-cors

EXPOSE 5000

CMD ["python", "server.py"]
