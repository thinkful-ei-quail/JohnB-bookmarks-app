import $ from 'jquery';
import 'normalize.css';
import './style.css';
import api from './api';
import store from './store';
import bookmarkList from './bookmark-list';

//Main function file//

const main = function() {
// get bookmarks from API then add each to the store then render
// also contains overall event handler and render
  api.getBookmarks()
    .then(bookmarks => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      bookmarkList.render();
    });

  //bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main());