import React from 'react';
import api from '../../api';

const Tags = (props) => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            props.onClickTag(
              tag,
              (page) => api.Articles.byTag(tag, page),
              api.Articles.byTag(tag)
            );
          };

          return (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
