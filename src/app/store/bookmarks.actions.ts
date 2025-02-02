import { createAction, props } from '@ngrx/store';
import { Bookmark } from '@app/models';

export const loadBookmarks = createAction('[Bookmarks] Load Bookmarks');
export const loadBookmarksSuccess = createAction(
  '[Bookmarks] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);
export const loadBookmarksFailure = createAction(
  '[Bookmarks] Load Bookmarks Failure',
  props<{ error: string }>()
);

export const createBookmark = createAction('[Bookmarks] Create Bookmark', props<{ bookmark: Bookmark }>());
export const createBookmarkSuccess = createAction('[Bookmarks] Create Bookmark Success', props<{ bookmark: Bookmark }>());

export const editBookmark = createAction('[Bookmarks] Edit Bookmark', props<{ bookmark: Bookmark }>());
export const editBookmarkSuccess = createAction('[Bookmarks] Edit Bookmark Success', props<{ bookmark: Bookmark }>());

export const filterBookmarks = createAction('[Bookmarks] Filter Bookmarks', props<{ query: string }>());
