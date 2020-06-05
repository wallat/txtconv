from werkzeug.contrib.fixers import ProxyFix
from flask import Flask
from flask_sockets import Sockets
# from pymongo import MongoClient

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.wsgi_app = ProxyFix(app.wsgi_app)
app.config.from_pyfile('../settings.py')
SETTINGS = app.config

sockets = Sockets(app)

# Link to MongoDB
# mongoConnUri = "mongodb://{}:{}".format(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
# if app.config['MONGO_USERNAME']:
# 	mongoConnUri = "mongodb://{}:{}@{}:{}".format(app.config['MONGO_USERNAME'], app.config['MONGO_PASSWORD'], app.config['MONGO_HOST'], app.config['MONGO_PORT'])

# mongoClient = MongoClient(mongoConnUri)

import xai.txtconv.route
