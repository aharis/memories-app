import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"

import { Provider } from 'react-redux';// access to state from anywere
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
