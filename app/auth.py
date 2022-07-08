from flask_openapi3 import HTTPBase, HTTPBearer
from flask import request
from app.model import ErrorMessage
from functools import wraps

security_schemes = {'basic': HTTPBase(), 'jwt': HTTPBearer()}

basic_security = [{'basic': []}]

jwt_security = [{'jwt': []}]


def jwt_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('authorization')
        if not token:
            return ErrorMessage(message='Missing JWT token').dict(), 401

        return f(token=token.split(' ')[-1], *args, **kwargs)

    return decorated


def basic_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = request.authorization.username
        pw = request.authorization.password

        if not user or not pw:
            return ErrorMessage(message='Missing username or password').dict(), 401

        return f(user=user, password=pw, *args, **kwargs)

    return decorated
