import { Bookmark } from '@app/models/bookmark.interface';

export interface BookmarkState {
  bookmarks: Bookmark[];
  filteredBookmarks: Bookmark[];
  searchQuery: string;
  error: string | null;
}
export const initialState: BookmarkState = {
  bookmarks: [],
  filteredBookmarks: [],
  searchQuery: '',
  error: null
};
