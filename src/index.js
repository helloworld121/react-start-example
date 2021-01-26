import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
// thunk makes it possible interrupt a current action AND dispatch a new one
// => this way we can execute async code
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

import reportWebVitals from './reportWebVitals';


// redux-dev-tools extension to support browser-plugin
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create store
const store = createStore(
    burgerBuilderReducer,
    // Redux DevTools Extension
    // => setting up the redux store with middleware and enhancers
    composeEnhancers(applyMiddleware(thunk))
);


// the application must be wrapped by BrowserRouter to activate Routing
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
