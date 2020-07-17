
// functions for manipulating store object //

const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const findById = function (id) {
  return this.STORE.bookmarks.find(currentItem => currentItem.id === id);
};

const findAndDelete = function(id) {
  this.STORE.bookmarks = this.STORE.bookmarks.filter(bookmark => bookmark.id !== id);
};

const addBookmark = function(item) {
  item.expanded = false;
  this.STORE.bookmarks.push(item);
};

const setError = function(error) {
  this.STORE.error = error;
};


export default {
  STORE,
  addBookmark,
  setError,
  findById,
  findAndDelete,
};