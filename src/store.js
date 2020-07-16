import $ from 'jquery';

// functions for manipulating store object //

const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const addBookmark = function(item) {
  item.expanded = false;
  this.STORE.bookmarks.push(item);
};


export default {
  STORE,
  addBookmark,
};