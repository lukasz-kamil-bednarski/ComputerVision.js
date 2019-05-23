import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from 'redux';
import {imageGalleryReducer} from "./reducers/imageGalleryReducer";
import {toolboxReducer} from "./reducers/toolboxReducer";
import {parametersReducer} from './reducers/parametersReducer';

import {Provider} from 'react-redux';

const allReducers = combineReducers({
    imageGallery: imageGalleryReducer,
    toolbox: toolboxReducer,
    parameters: parametersReducer
});

export const store = createStore(allReducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();