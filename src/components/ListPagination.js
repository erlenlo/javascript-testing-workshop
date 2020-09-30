import React from 'react';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

const mapStateToProps = (state) => ({
  currentPage: state.articleList.currentPage,
  pageSize: state.articleList.pageSize,
});

const ListPagination = ({
  currentPage,
  pageSize,
  articlesCount,
  onSetPage,
}) => {
  if (articlesCount <= pageSize) {
    return null;
  }

  const pages = [];
  for (let i = 1; i < Math.ceil(articlesCount / pageSize) + 1; ++i) {
    pages.push(i);
  }

  const setPage = (page) => {
    onSetPage(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(page);
          };
          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={onClick}
              key={page.toString()}
            >
              <button className="page-link">{page}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPagination);
