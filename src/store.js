import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware } from './middleware';
import { reducer } from './reducer';

import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ basename: '/' });

const getMiddleware = () => {
  return applyMiddleware(routerMiddleware(history), promiseMiddleware);
};

export const store = createStore(
  reducer(history),
  composeWithDevTools(getMiddleware())
);
