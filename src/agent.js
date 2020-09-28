const API_ROOT = 'http://localhost:8000';

const encode = encodeURIComponent;

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('json')) {
    return await response.json();
  } else {
    return response.status;
  }
}

const acceptJsonHeader = {
  Accept: 'application/json',
  'Accept-Charset': 'utf-8',
};

const contentTypeJsonHeader = {
  'Content-Type': 'application/json',
};

const authorizationHeader = () => {
  return {
    Authorization: 'foo',
  };
};

const requests = {
  get: (url) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'GET',
      headers: {
        ...acceptJsonHeader,
        ...authorizationHeader(),
      },
    }).then(handleResponse),
  post: (url, body) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'POST',
      headers: {
        ...acceptJsonHeader,
        ...contentTypeJsonHeader,
        ...authorizationHeader(),
      },
      body: JSON.stringify(body),
    }).then(handleResponse),
  put: (url, body) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'PUT',
      headers: {
        ...acceptJsonHeader,
        ...contentTypeJsonHeader,
        ...authorizationHeader(),
      },
      body: JSON.stringify(body),
    }).then(handleResponse),
  del: (url) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'DELETE',
      headers: {
        ...acceptJsonHeader,
        ...authorizationHeader(),
      },
    }).then(handleResponse),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const Articles = {
  all: () => requests.get(`/articles`),
  byTag: (tag) => requests.get(`/articles?tag=${encode(tag)}`),
  del: (id) => requests.del(`/articles/${id}`),
  favorite: (id) => requests.post(`/articles/${id}/favorite`),
  get: (id) => requests.get(`/articles/${id}`),
  unfavorite: (id) => requests.del(`/articles/${id}/favorite`),
  update: (article) => requests.put(`/articles/${article.id}`, article),
  create: (article) => requests.post('/articles', article),
};

export default {
  Articles,
  Tags,
};
