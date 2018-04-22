from flask import Flask, jsonify, request, Response, send_from_directory, url_for
from xai import app
import json
import requests
import time
import os
import datetime
import logging
import chardet
from werkzeug.utils import secure_filename
from opencc import OpenCC

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# endpoints
@app.route("/", methods=['GET'])
def indexAction():
	return jsonify({
		'Hi': 'Server side works fine'
	})

@app.route("/"+app.config['API_VERSION']+"/api/conv", methods=['POST'])
def conv():
	if request.method == 'POST':
		# check if the post request has the file part
		if 'file' not in request.files:
			return jsonify({
				'status': 'Error',
				'message': 'Shold have file part'
			})

		file = request.files['file']

		if file.filename == '':
			return jsonify({
				'status': 'Error',
				'message': 'No file is selected'
			})

		if file:
			openCC = OpenCC('s2twp')

			# prepare the files
			srcFileName = datetime.datetime.now().strftime("%Y-%m-%d SRC")+openCC.convert(file.filename)
			destFilename = datetime.datetime.now().strftime("%Y-%m-%d ")+openCC.convert(file.filename)
			srcFilePath = os.path.join(app.config['UPLOAD_FOLDER'], srcFileName)
			destFilePath = os.path.join(app.config['UPLOAD_FOLDER'], destFilename)
			file.save(srcFilePath)

			# guess the encoding
			rawdata = open(srcFilePath, 'rb').read(500)
			result = chardet.detect(rawdata)
			charenc = result['encoding']

			# convert the file content
			with open(srcFilePath, 'r', encoding=charenc, errors='ignore') as srcf:
				with open(destFilePath, 'w') as destf:
					for line in srcf:
						line = openCC.convert(line)
						destf.write(line)

			# remove useless file
			os.remove(srcFilePath)

			return jsonify({
				'status': 'OK',
				'downloadLink': url_for('static_file', filename=destFilename)
			})

@app.route("/"+app.config['API_VERSION']+"/static_file/<path:filename>", methods=['GET'])
def static_file(filename):
	""" Serve the static file from upload folder"""
	return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
