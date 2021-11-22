import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import { VoxeetSessionProvider } from './SessionAndInitialization/VoxeetProvider'
import { initializeVoxeet } from './SessionAndInitialization/SessionInitialization'

const store = createStore(reducers, applyMiddleware(thunk));

initializeVoxeet();

ReactDOM.render(
    
        <VoxeetSessionProvider>
            <Provider store={store}>
            <App />
            </Provider>
        </VoxeetSessionProvider>
  
    , document.querySelector('#root')
);
