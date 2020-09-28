import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

const initialState = {
  id: '',
  title: '',
  text: '',
  tagInput: '',
  tags: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        id: action.payload ? action.payload.id : '',
        title: action.payload ? action.payload.title : '',
        text: action.payload ? action.payload.text : '',
        tagInput: '',
        tags: action.payload ? action.payload.tags : [],
      };
    case EDITOR_PAGE_UNLOADED:
      return { ...initialState };
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tags: state.tags.concat([state.tagInput]),
        tagInput: '',
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.tag),
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
