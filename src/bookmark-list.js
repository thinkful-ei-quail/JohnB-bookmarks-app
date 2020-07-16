import $ from 'jquery';
import store from './store';

// Event handlers and HTML templates //


// HTML Templates //

const generateMainPage = function(bookmarks) {
  return `<form class="js-bookmark-form bookmark-form">
  <button type="submit" class="js-add-bookmark"><i class="fas fa-plus"></i> Add Bookmark</button>
  <label for="rating-filter">Filter:
      <select id="rating-filter" name="filter">
          <option value="0">---</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
      </select>
  </label>
</form>
<div class="bookmark-list-container">
  <ul class="js-bookmark-list bookmark-list">
  ${bookmarks}
  </ul>
</div>`;
};

const generateBookmarkItemElement = function(item) {
  let starCount = '';
  switch(item.rating) {
  case(1):
    starCount = "<i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>"
    break;
  case(2):
    starCount = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>"
    break;
  case(3):
    starCount = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>"
    break;
  case(4):
    starCount = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i>"
    break;
  case(5):
    starCount = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";
  }
  return `<li>
    <div class="shrunk-view">
        <div class="title main-tile">
            <p>${item.title}</p>
        </div>
        <div class="list-rating-display main-tile">${starCount}</div>
        
    </div>
    <div class="description-container">
        
        <div class="js-expanded expanded-description ${item.expanded ? '' : 'hidden'}">
        <div clas="delete-button-container"><button type="submit" class="close-btn"><i class="far fa-trash-alt"></i></button></div>
            <p class="description-text">${item.desc}</p>
            <a href="${item.url}" alt="link to visit ${item.title}"><button class="visit-site-btn">Visit Page</button></a>
        </div>
    </div>
</li>`;
};

const generateBookmarkListString = function(bookmarkList) {
  let bookmarkItems = bookmarkList.map(bookmark => generateBookmarkItemElement(bookmark));
  return bookmarkItems.join('');
};


const generateAddBookmarkPage = function() {
  return `<div class="add-bookmark-subheader"><h4>Please fill out all available fields</h2></div>
  <div class="add-bookmark-container">
      <form class="add-bookmark-form">
          <label class="add-form-label" for="title">Title</label>
          <input class="add-form-input" type="text" id="title" placeholder="Bookmark title" name="title" required/>
          <label class="add-form-label" for="url">URL</label>
          <input class="add-form-input" type="url" id="url" placeholder="http://www.example.com" name="url" required/>
          <label for="rating" class="add-form-label">Rating</label>
          <select class="add-form-input" name="rating" id="rating">
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
          </select>
          <label for="description" class="add-form-label">Description</label>
          <textarea class="add-form-input" name="description" id="description" ></textarea>
          <button class="js-cancel-add add-form-button cancel-btn">Cancel</button>
          <button class="js-submit-add add-form-button submit-btn" type="submit">Submit</button>
      </form>
      ${store.STORE.error ? `<div class="js-error-box error-box"><div class="js-close-error-button close-error-button"><i class="fas fa-window-close"></i></div><div class="error-text">${store.STORE.error.message}</div></div>` : ''} 
    </div>`;
};


const render = function() {
  if (store.STORE.adding) {
    const addPageString = generateAddBookmarkPage();
    $('.main-content').html(addPageString);
  } else {
    let items = [...store.STORE.bookmarks];
    if (store.STORE.filter > 1) {
      items = items.filter(item => item.rating >= store.STORE.filter);
    }

    const bookmarkListHTML = generateBookmarkListString(items);
    const fullPage = generateMainPage(bookmarkListHTML);

    $('.main-content').html(fullPage);
  }
};

// Event Handlers //

const handleNewBookmarkClick = function() {
  $('.main-content').on('click', '.js-add-bookmark', event => {
    event.preventDefault();
    store.STORE.adding = true;
    render();
  });
};

const handleCancelNewBookmark = function() {
  $('.main-content').on('click', '.js-cancel-add', (event) => {
    event.preventDefault();
    store.STORE.adding = false;
    render();
  });
};


const bindEventListeners = function() {
  handleNewBookmarkClick();
  handleCancelNewBookmark();
};

export default {
  render,
  bindEventListeners,
};