import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Hot Reload : Detects code changes and update without freshing the page
 */
if(module.hot) {
    module.hot.accept();
  }