import { Bookmark } from '@app/models/bookmark.interface';

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}
