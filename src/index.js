import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducers';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'Recettes',
  storage: storage,
  whitelist: ['FavoritesReducer'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, reducers);

const logger = store => next => action => {
  //console.group(action.type)
  //console.info('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(pReducer, composeEnhancers(
  applyMiddleware(logger,ReduxThunk)
));
const persistor = persistStore(store);
export { persistor, store };



ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
