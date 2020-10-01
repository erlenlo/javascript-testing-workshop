import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  HOME_PAGE_LOADED,
  DELETE_ARTICLE,
} from '../constants/actionTypes';

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  pageSize: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article.id === action.payload.id) {
            return {
              ...article,
              favoritedBy: action.payload.favoritedBy,
            };
          }
          return article;
        }),
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload,
        articlesCount: action.payload.length,
        tab: action.tab,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload.id
        ),
        articlesCount: state.articlesCount - 1,
      };
    default:
      return state;
  }
};
