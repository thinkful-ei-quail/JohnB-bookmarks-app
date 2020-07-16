
//functions for interacting with API//


const BASE_URL = 'https://thinkful-list-api.herokuapp.com/johnb';

const callApi = function(...args) {
  let error = null;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = {code: res.status};

        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = function() {
  return callApi(`${BASE_URL}/bookmarks`);
};

const createBookmark = function(newBookmark) {
  let bookmarkInfo = JSON.stringify(newBookmark);
  return callApi(`${BASE_URL}/bookmarks`, {method: 'POST', headers: {'content-type': 'application/json'}, body: bookmarkInfo});
};

const deleteBookmark = function(id) {
  return callApi(`${BASE_URL}/bookmarks/${id}`, {method: 'DELETE'});
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};