import os
from xai import app

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
	return response

if __name__ == '__main__':
	from gevent import pywsgi
	from geventwebsocket.handler import WebSocketHandler

	# print("server will listen to port:", app.config['LISTEN_PORT'])
	# app.run(host= '0.0.0.0',
	# 	port=app.config['LISTEN_PORT'],
	# 	debug=os.environ.get('PYTHON_ENV')=="dev")

	# websocket version
	print("server will listen to port:", app.config['LISTEN_PORT'])
	server = pywsgi.WSGIServer(('', app.config['LISTEN_PORT']), app, handler_class=WebSocketHandler)
	server.serve_forever()
