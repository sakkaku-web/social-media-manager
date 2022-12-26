FROM python:3.10-slim-buster

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./app ./app
COPY ./.env .
COPY ./wsgi.py .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
