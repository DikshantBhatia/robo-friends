import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from  './containers/App'

import 'tachyons';
import { createStore, applyMiddleware, combineReducers  } from 'redux';
import { searchRobots, requestRobots } from './reducers';
import { Provider, connect } from 'react-redux'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


const logger = createLogger();

const rootReducers = combineReducers({requestRobots, searchRobots})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware,  logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
