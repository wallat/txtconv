import React, { Component } from 'react';
import {observer} from "mobx-react";

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

const FileRow = observer(class extends Component {
  render () {
    const {store} = this.props

    return (<div className="file-row file-status">
            <div className="is-flex">
              <div className="main-infos">
                <h3 className="is-size-5">
                  {store.downloadLink ?
                    <a href={store.downloadLink} target="_blank"> {store.filename} </a>
                    : store.filename
                  }
                </h3>
                <div className="">{humanFileSize(store.size, true)}</div>
                {store.errMessage && <div className="has-text-danger">{store.errMessage}</div>}
              </div>
              <div className="is-flex controls">
                {store.isUploading!==false &&
                  <div><progress className="progress" value={store.progress} max="100"></progress></div>}
                {store.isUploading===false && store.isProcessing &&
                  <span><i className="fa fa-spinner fa-spin"></i></span>}
                {store.downloadLink &&
                  <a href={store.downloadLink} target="_blank">
                    <i className="fa fa-download"></i>
                  </a>}
              </div>
            </div>
          </div>)
  }
})

export default observer(class extends Component {
  render() {
  	const {fileQueue} = this.props;

    return (
      <div className="App">
        {fileQueue.queue.map((fileHanlder, i) => {
        	return (<FileRow store={fileHanlder} key={'FileRow'+i}/>)
        })}
      </div>
    );
  }
})
