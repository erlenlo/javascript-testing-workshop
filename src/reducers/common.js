import {
  APP_LOAD,
  REDIRECT,
  ARTICLE_SUBMITTED,
  DELETE_ARTICLE,
} from '../constants/actionTypes';

const initialState = {
  appName: 'Sharing Hub',
  viewChangeCounter: 0,
  currentUser: { username: 'foo' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case ARTICLE_SUBMITTED:
      const redirectUrl = '/';
      return { ...state, redirectTo: redirectUrl };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    default:
      return state;
  }
};
