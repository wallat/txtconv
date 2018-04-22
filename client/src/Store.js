import {extendObservable} from 'mobx'

class FileHandler {
	constructor(file) {
		extendObservable(this, {
			file: file,
			filename: file ? file.name : '',
			size: file ? file.size : '',
			progress: 0,
			downloadLink: null,
			isUploading: false,
			isProcessing: false,
			errMessage: null
		})
	}

	/**
	 * Upload the file to server
	 * @return {}
	 */
	upload () {
		// prepare form data
		var formData = new FormData();
		formData.append('file', this.file);
		this.isProcessing = true;

		// create the ajax
		var xhr = new XMLHttpRequest();
		xhr.open('POST', window.CONFS.apiServer+'/api/conv');

		xhr.upload.onprogress = (event) => {
			this.isUploading = true;
			if (event.lengthComputable) {
				let complete = (event.loaded / event.total * 100 | 0);
				this.progress = complete;
			}
		}

		xhr.upload.onloadend = (event) => {
			this.isUploading = false;
		}

		xhr.onload = () => {
			this.progress = 100;
			this.isProcessing = false;
			this.isUploading = false;

			if (xhr.status===200) {
				var response = JSON.parse(xhr.responseText);
				this.onFileLoaded(response)
			} else {
				this.errMessage = 'Something wrong';
			}
		};

		xhr.onerror = (e) => {
			this.isProcessing = false;
			this.isUploading = false;

			switch(xhr.status) {
				case 404:
					this.errMessage = '404 File not found';
					break;
				case 500:
					this.errMessage = '500 Server error';
					break;
				case 0:
					this.errMessage = '500 Request aborted';
					break;
				default:
					this.errMessage = 'Unknown error ' + xhr.status;
			}
		};

		xhr.send(formData);
	}

	onFileLoaded (response) {
		if (response.status==='OK') {
			this.downloadLink = window.CONFS.apiServer+response.downloadLink.replace('/v1.0', '')
		} else {
			this.errMessage = response.message || 'Server Error'
		}
	}
}

class FileQueue {
	constructor () {
		extendObservable(this, {
			queue: []
		})
	}

	addFile (file) {
		let handler = new FileHandler(file);
		handler.upload()
		this.queue.push(handler)
	}
}

export {FileQueue, FileHandler}