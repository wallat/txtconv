import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {observer} from "mobx-react";

export default observer(class extends Component {
	onDrop(files) {
		const {fileQueue} = this.props;

		files.forEach(file => {
			fileQueue.addFile(file)
		})
	}

	render() {
		return (
			<div className="dropzone">
				<Dropzone
					onDrop={this.onDrop.bind(this)}
					className="dropzone-nornaml"
					activeClassName="dropzone-active">
					<p>上傳檔案，支援 txt, csv, srt, ...</p>
				</Dropzone>
			</div>
		);
	}
})
