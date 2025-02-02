import { createReducer, on } from '@ngrx/store';
import * as BookmarkActions from './bookmarks.actions';
import { initialState } from '@app/models';

export const bookmarksReducer = createReducer(
  initialState,
  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => {
    console.log('[Reducer]: Load Bookmarks:', bookmarks);
    return {
      ...state,
      bookmarks: bookmarks,
      filteredBookmarks: bookmarks
    };
  }),
  on(BookmarkActions.filterBookmarks, (state, { query }) => {
    const filteredList = state.bookmarks.filter((bookmark) =>
      bookmark.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log('[Reducer]: Filter Bookmarks:', filteredList);
    return {
      ...state,
      searchQuery: query,
      filteredBookmarks: filteredList
    };
  }),
  on(BookmarkActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(BookmarkActions.createBookmarkSuccess, (state, { bookmark }) => {
    console.log('[Reducer]: Create Bookmark:', bookmark);
    return {
      ...state,
      bookmarks: [...state.bookmarks, bookmark]
    };
  }),
  on(BookmarkActions.editBookmarkSuccess, (state, { bookmark }) => {
    console.log('[Reducer]: Edit Bookmark:', bookmark);
    return {
      ...state,
      bookmarks: state.bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b))
    };
  })
);
