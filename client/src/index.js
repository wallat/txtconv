import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {FileQueue, FileHandler} from './Store'

// load global configs
window.CONFS = {
	apiServer: process.env.REACT_APP_WEB_API_SERVER || "http://localhost:23360/v1.0"
}

// init store
let fq = new FileQueue()

// let fh = new FileHandler()
// fh.filename = '皇后总想抛弃朕.txt'
// fh.size = 23360
// fh.progress = 0
// fh.isUploading = true
// fh.isProcessing = true
// fq.queue.push(fh)

// fh = new FileHandler()
// fh.filename = '七零吃货军嫂.txt'
// fh.size = 123456
// fh.progress = 57
// fh.isUploading = true
// fh.isProcessing = true
// fq.queue.push(fh)

// fh = new FileHandler()
// fh.filename = '宠妾作死日常.txt'
// fh.size = 65321
// fh.progress = 100
// fh.isUploading = false
// fh.isProcessing = true
// fq.queue.push(fh)

// fh = new FileHandler()
// fh.filename = 'SOME BOOK.txt'
// fh.size = 453466
// fh.progress = 100
// fh.isUploading = false
// fh.isProcessing = false
// fh.downloadLink = 'http://abv'
// fh.errMessage = 'Oh My God'
// fq.queue.push(fh)

// render
ReactDOM.render(<App fileQueue={fq}/>, document.getElementById('root'));
registerServiceWorker();
