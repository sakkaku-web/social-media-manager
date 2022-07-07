from flask_openapi3 import HTTPBase, HTTPBearer

security_schemes = {'basic': HTTPBase(), 'jwt': HTTPBearer()}

basic_security = [{'basic': []}]

jwt_security = [{'jwt': []}]
