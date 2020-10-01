import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from '../constants/actionTypes';

const initialState = {
  article: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload,
      };
    case ARTICLE_PAGE_UNLOADED:
      return { ...initialState };
    default:
      return state;
  }
};
