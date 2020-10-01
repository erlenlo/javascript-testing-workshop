import ArticleList from '../ArticleList';
import React from 'react';
import { connect } from 'react-redux';

const GlobalFeedTab = (props) => {
  return (
    <li className="nav-item">
      <button className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}>
        Global Feed
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
});

const MainView = ({
  articles,
  loading,
  articlesCount,
  currentPage,
  pageSize,
  onTabClick,
  tab,
}) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
        </ul>
      </div>

      <ArticleList
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
};

export default connect(mapStateToProps, {})(MainView);
