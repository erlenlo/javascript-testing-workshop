import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { connect } from 'react-redux';
import { history } from '../store';
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  DELETE_ARTICLE,
} from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapStateToProps = (state) => {
  return {
    currentUser: state.common.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  favorite: async (id) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: await api.Articles.favorite(id),
    }),
  unfavorite: async (id) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: await api.Articles.unfavorite(id),
    }),
  onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticlePreview = ({
  article,
  favorite,
  unfavorite,
  onClickDelete,
  currentUser,
}) => {
  const favorited = article.favoritedBy.some(
    (u) => u.username === currentUser?.username
  );
  const favoriteButtonClass = favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = (event) => {
    event.preventDefault();
    if (favorited) {
      unfavorite(article.id);
    } else {
      favorite(article.id);
    }
  };

  const details = () => {
    history.push(`/article/${article.id}`);
  };

  const del = async () => {
    onClickDelete(await api.Articles.del(article.id));
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <div>
          <div className="info">
            <Link className="author" to={`/@${article.author.username}`}>
              {article.author.username}
            </Link>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
          </div>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritedBy?.length}
          </button>
        </div>
      </div>

      <div className="preview-content">
        <div className="cursor-pointer" onClick={details}>
          <h1>{article.title}</h1>
          <p>{article.text}</p>
        </div>

        {article.author.username === currentUser?.username && (
          <React.Fragment>
            <Link
              className="btn btn-sm btn-outline-primary mr-2"
              to={`/editor/${article.id}`}
            >
              <i className="ion-android-create"></i>
            </Link>
            <button className="btn btn-sm btn-outline-danger" onClick={del}>
              <i className="ion-android-close"></i>
            </button>
          </React.Fragment>
        )}

        <ul className="tag-list">
          {article.tags.map((tag) => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);
