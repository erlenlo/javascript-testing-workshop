import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = (props) => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.id));
  };
  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.id}`}
          className="btn btn-outline-secondary btn-sm mr-2"
        >
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </span>
    );
  }

  return <span></span>;
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
