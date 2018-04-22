import React, { Component } from 'react';
import './App.css';

import Uploader from './uploader'
import FileQueue from './filequeue'

class App extends Component {
  render() {
    const {fileQueue} = this.props;

    return (
      <div className="App">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-left">
                純文字簡體轉繁體
              </h1>
              <h2 className="subtitle has-text-left">
                只要幾秒鐘，快速幫您轉換簡體純文字檔、電影字幕檔到繁體中文。
              </h2>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="dropzone-panel">
            <Uploader fileQueue={fileQueue}></Uploader>
          </div>
          <FileQueue fileQueue={fileQueue}></FileQueue>
        </div>
      </div>
    );
  }
}

export default App;
