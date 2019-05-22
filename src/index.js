import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import Application from './components/Application'
// import App from './App';
import { ApplicationStore } from './stores/ApplicationStore'
import * as serviceWorker from './serviceWorker';
let app = ApplicationStore.create()
ReactDOM.render(
  <Provider app={app}>
    <Application />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
