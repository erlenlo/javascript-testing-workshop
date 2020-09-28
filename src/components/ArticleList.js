import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';

const ArticleList = ({ articles, articlesCount, pageSize, currentPage }) => {
  if (!articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  const pageStart = (currentPage - 1) * pageSize;
  const pageStop = pageStart + pageSize;

  return (
    <div>
      {articles.slice(pageStart, pageStop).map((article) => {
        return <ArticlePreview article={article} key={article.id} />;
      })}

      <ListPagination articlesCount={articlesCount} currentPage={currentPage} />
    </div>
  );
};

export default ArticleList;
