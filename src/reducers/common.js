import {
  APP_LOAD,
  REDIRECT,
  ARTICLE_SUBMITTED,
  DELETE_ARTICLE,
  LOGIN,
  LOGOUT,
} from '../constants/actionTypes';
import { getUser, setUser } from '../store';

const initialState = {
  appName: 'Sharing Hub',
  viewChangeCounter: 0,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        currentUser: getUser(),
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGIN:
      const user = { username: action.payload };
      setUser(user);
      return { ...state, currentUser: user, redirectTo: '/' };
    case LOGOUT:
      setUser(null);
      return { ...state, currentUser: null, redirectTo: '/register' };
    case ARTICLE_SUBMITTED:
      return { ...state, redirectTo: '/' };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    default:
      return state;
  }
};
