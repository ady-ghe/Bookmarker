import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookmarkState } from '@app/models';

export const selectBookmarksState = createFeatureSelector<BookmarkState>('bookmarks');

export const selectAllBookmarks = createSelector(
  selectBookmarksState,
  (state) => state.bookmarks
);

export const selectFilteredBookmarks   = createSelector(
  selectBookmarksState,
  (state) => state.filteredBookmarks
);

export const selectBookmarkById = (id: number) =>
  createSelector(
    selectAllBookmarks,
    (bookmarks) => bookmarks.find(b => Number(b.id) === id)
  );

