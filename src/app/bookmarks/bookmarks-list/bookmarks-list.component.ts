import { Component, OnInit } from '@angular/core';
import { Bookmark } from '@app/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllBookmarks, selectFilteredBookmarks } from '@app/store/bookmarks.selectors';
import { loadBookmarks } from '@app/store/bookmarks.actions';
import { GroupedBookmarks } from '@app/models/grouped-bookmarks.interface';

@Component({
  standalone: false,
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  groupedBookmarks: GroupedBookmarks = { today: [], yesterday: [], older: [] };

  get noBookmarks(): boolean {
    return (
      !this.groupedBookmarks.today.length &&
      !this.groupedBookmarks.yesterday.length &&
      !this.groupedBookmarks.older.length
    );
  }

  constructor(private store: Store) {
    //this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.bookmarks$ = this.store.select(selectFilteredBookmarks);
  }

  ngOnInit(): void {
    console.log('[BookmarksListComponent] Dispatching loadBookmarks action...');
    this.store.dispatch(loadBookmarks());
    this.bookmarks$.subscribe((bookmarks) => {
      if (bookmarks) {
        this.groupedBookmarks = this.groupBookmarks(bookmarks);
      }
    });
  }

  private groupBookmarks(bookmarks: Bookmark[]): GroupedBookmarks {
    const today: Bookmark[] = [];
    const yesterday: Bookmark[] = [];
    const older: Bookmark[] = [];
    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    bookmarks.forEach((bookmark) => {
      const createdAtDate = new Date(bookmark.createdAt);
      const bookmarkDate = new Date(createdAtDate.getFullYear(), createdAtDate.getMonth(), createdAtDate.getDate());

      if (bookmarkDate.getTime() === todayDate.getTime()) {
        today.push(bookmark);
      } else if (bookmarkDate.getTime() === yesterdayDate.getTime()) {
        yesterday.push(bookmark);
      } else {
        older.push(bookmark);
      }
    });

    return {
      today: this.sortBookmarks(today),
      yesterday: this.sortBookmarks(yesterday),
      older: this.sortBookmarks(older)
    };
  }

  private sortBookmarks(bookmarks: Bookmark[]): Bookmark[] {
    return bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
