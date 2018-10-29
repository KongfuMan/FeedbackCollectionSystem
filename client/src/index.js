import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk'
import './setupProxy';

//we can use axios to make a http request from browser console,
// so that each of our request takes the cookie
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers,{},applyMiddleware(ReduxThunk));

ReactDom.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root')
);

// console.log('Stripe key is',process.env.REACT_APP_STRIPE_KEY);
// console.log('NODE_ENV is',process.env.NODE_ENV);