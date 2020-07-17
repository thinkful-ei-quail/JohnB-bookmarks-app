import $ from 'jquery';
import store from './store';
import api from './api';

// Event handlers and HTML templates //


// HTML Templates //

const generateMainPage = function(bookmarks) {
  return `<form class="js-bookmark-form bookmark-form">
  <button type="submit" class="js-add-bookmark add-bookmark"><i class="fas fa-plus"></i> Add Bookmark</button>
  <label for="rating-filter" class="filter-label">Filter:
      <select id="rating-filter" name="filter">
          <option value="0">Select</option>
          <option value="1" ${store.STORE.filter === 1 ? 'selected' : ''} >All</option>
          <option value="2" ${store.STORE.filter === 2 ? 'selected' : ''} >2 stars</option>
          <option value="3" ${store.STORE.filter === 3 ? 'selected' : ''} >3 stars</option>
          <option value="4" ${store.STORE.filter === 4 ? 'selected' : ''} >4 stars</option>
          <option value="5" ${store.STORE.filter === 5 ? 'selected' : ''} >5 stars</option>
      </select>
  </label>
</form>
<div class="bookmark-list-container">
  <ul class="js-bookmark-list bookmark-list">
  ${bookmarks}
  </ul>
  ${store.STORE.error ? `<div class="js-error-box error-box"><div class="js-close-error-button close-error-button"><i class="fas fa-window-close"></i></div><div class="error-text">${store.STORE.error}</div></div>` : ''}
</div>`;
};

const generateBookmarkItemElement = function(item) {
  let starCount = '';
  switch(item.rating) {
  case(1):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(2):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(3):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(4):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(5):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i>';
  }
  return `<li tabindex="0" class="js-tab">
    <div class="shrunk-view js-shrunk-view" data-id="${item.id}">
        <div class="title main-tile">
            <p>${item.title}</p>
        </div>
        <div class="list-rating-display main-tile">${starCount}</div>
        
    </div>
    <div class="description-container">
        
        <div class="js-expanded expanded-description ${item.expanded ? '' : 'hidden'}">
        <div clas="delete-button-container"><button type="submit" class="js-delete-btn delete-btn"><i class="far fa-trash-alt"></i></button></div>
            <p class="description-text">${item.desc}</p>
            <a href="${item.url} target="_blank" alt="link to visit ${item.title}" class="page-link">Visit Page</a>
        </div>
    </div>
</li>`;
};

const generateBookmarkListString = function(bookmarkList) {
  let bookmarkItems = bookmarkList.map(bookmark => generateBookmarkItemElement(bookmark));
  return bookmarkItems.join('');
};


const generateAddBookmarkPage = function() {
  return `<div class="add-bookmark-subheader"><h4>Please fill out all available fields</h4></div>
  <div class="add-bookmark-container">
      <form class="add-bookmark-form">
          <label class="add-form-label" for="title">Title</label>
          <input class="add-form-input" type="text" id="title" placeholder="Bookmark title" name="title" required/>
          <label class="add-form-label" for="url">URL</label>
          <input class="add-form-input" type="url" id="url" placeholder="http://www.example.com" name="url" required/>
          <label for="rating" class="add-form-label">Rating</label>
          <select class="add-form-input" name="rating" id="rating" required>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
          </select>
          <label for="description" class="add-form-label">Description</label>
          <textarea class="add-form-input" name="description" id="description" required></textarea>
          <div class="add-bookmark-btns">
          <button class="js-cancel-add add-form-button cancel-btn">Close</button>
          <button class="js-submit-add add-form-button submit-btn" type="submit">Submit</button>
          </div>
      </form>
      ${store.STORE.error ? `<div class="js-error-box error-box"><div class="js-close-error-button close-error-button"><i class="fas fa-window-close"></i></div><div class="error-text">${store.STORE.error}</div></div>` : ''} 
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
    

    $('.js-main-content').html(fullPage);
  }
};

// Event Handlers //

const handleNewBookmarkClick = function() {
  $('.js-main-content').on('click', '.js-add-bookmark', event => {
    event.preventDefault();
    store.STORE.adding = true;
    render();
  });
};

const handleCancelNewBookmark = function() {
  $('.js-main-content').on('click', '.js-cancel-add', (event) => {
    event.preventDefault();
    store.STORE.adding = false;
    render();
  });
};

const handleCloserErrorBox = function() {
  $('.js-main-content').on('click', '.js-close-error-button', () => {
    store.STORE.error = null;
    render();
  });
};

const handleSubmitNewBookmark = function() {
  $('.js-main-content').on('click', '.js-submit-add', event => {
    event.preventDefault();
    const bookmarkInfo = {
      title: '',
      url: '',
      desc: '',
      rating: 0 
    };

    bookmarkInfo.title = $('#title').val();
    bookmarkInfo.url = $('#url').val();
    bookmarkInfo.desc = $('#description').val();
    bookmarkInfo.rating = $('#rating').val();
    
    $('#title').val('');
    $('#url').val('');
    $('#description').val('');
    $('#rating').val('');

    api.createBookmark(bookmarkInfo)
      .then(data => {
        store.addBookmark(data);
        store.STORE.adding = false;
        render();
      })
      .catch(error => {
        store.setError(error.message);
        render();
      });
  });
};

const handleFilterSelection = function() {
  $('.js-main-content').on('change', '#rating-filter', () => {
    const filterValue = Number($('#rating-filter').val());
    
    store.STORE.filter = filterValue;
    render();
  });
};

const findExpansionElementId = function(item) {
  return $(item).data('id');
};

const findExpansionElementIdKeypress = function(item) {
  return $(item).children().data('id');
};

const handleExpansion = function() {
  $('.js-main-content').on('click', '.js-shrunk-view', (event => {
    const id = findExpansionElementId(event.currentTarget);
    const itemInStore = store.findById(id);
    itemInStore.expanded = !itemInStore.expanded;
    render();    
  }));
};

const handleExpansionKeypress = function() {
  $('.js-main-content').on('keypress', '.js-tab', event => {
    if (event.key === ' ' || event.key === 'Enter') {
      const id = findExpansionElementIdKeypress(event.currentTarget);
      const itemInStore = store.findById(id);
      itemInStore.expanded = !itemInStore.expanded;
      render();
    }
  });
};

const handleDeleteKeypress = function() {
  $('.js-main-content').on('keypress', '.js-delete-btn', event => {
    if (event.key === ' ' || event.key === 'Enter') {
      const id = findIdForDelete(event.currentTarget);
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          render();
        });
    }
  });
};

const findIdForDelete = function(item) {
  return $(item).parent().parent().parent().siblings().data('id');
};

const handleDeleteButtonClick = function() {
  $('.js-main-content').on('click', '.js-delete-btn', event => {
    const id = findIdForDelete(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      }).catch((error) => {
        store.setError(error.message);
        render();
      });
  });
};



const bindEventListeners = function() {
  handleNewBookmarkClick();
  handleCancelNewBookmark();
  handleSubmitNewBookmark();
  handleCloserErrorBox();
  handleFilterSelection();
  handleExpansion();
  handleExpansionKeypress();
  handleDeleteButtonClick();
  handleDeleteKeypress();
};

export default {
  render,
  bindEventListeners,
};