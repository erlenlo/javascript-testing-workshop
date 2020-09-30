import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
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
    case APPLY_TAG_FILTER:
      return {
        ...state,
        articles: action.payload,
        articlesCount: action.payload.length,
        tab: null,
        tag: action.tag,
        currentPage: 1,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: [],
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
