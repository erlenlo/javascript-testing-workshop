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

export const getUser = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (error) {
    return null;
  }
};

export const setUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (error) {
    console.log(error);
  }
};
