import {
  APP_LOAD,
  REDIRECT,
  ARTICLE_SUBMITTED,
  DELETE_ARTICLE,
  SET_CURRENT_USER,
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
    case SET_CURRENT_USER:
      const user = { username: action.payload };
      setUser(user);
      return { ...state, currentUser: user, redirectTo: '/' };
    case ARTICLE_SUBMITTED:
      const redirectUrl = '/';
      return { ...state, redirectTo: redirectUrl };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    default:
      return state;
  }
};
