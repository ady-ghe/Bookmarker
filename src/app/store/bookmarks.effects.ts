import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import * as BookmarkActions from './bookmarks.actions';
import { BookmarkService } from '@app/services/bookmark.service';

@Injectable()
export class BookmarksEffects {
  loadBookmarks$: Observable<Action>;
  createBookmark$: Observable<Action>;
  editBookmark$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) {
    console.log('In BookmarksEffects constructor, actions$: ', actions$);

    this.loadBookmarks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.loadBookmarks),
        tap(() => console.log('[Effect] triggered: Load bookmarks...')),
        mergeMap(() =>
          this.bookmarkService.getBookmarks().pipe(
            map((bookmarks) =>
              BookmarkActions.loadBookmarksSuccess({ bookmarks })
            ),
            catchError((error) =>
              of(BookmarkActions.loadBookmarksFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.createBookmark$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.createBookmark),
        tap(() => console.log('[Effect] triggered: Create bookmark...')),
        mergeMap(({ bookmark }) =>
          this.bookmarkService.createBookmark(bookmark).pipe(
            map((createdBookmark) =>
              BookmarkActions.createBookmarkSuccess({ bookmark: createdBookmark })
            ),
            catchError((error) =>
              of(BookmarkActions.loadBookmarksFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.editBookmark$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.editBookmark),
        tap(({ bookmark }) =>
          console.log('[Effect] Before update - Bookmark to edit:', bookmark)
        ),
        mergeMap(({ bookmark }) =>
          this.bookmarkService.updateBookmark(bookmark).pipe(
            tap((updatedBookmark) =>
              console.log('[Effect] After update - Updated bookmark:', updatedBookmark)
            ),
            map((updatedBookmark) =>
              BookmarkActions.editBookmarkSuccess({ bookmark: updatedBookmark })
            ),
            catchError((error) => {
              console.error('[Effect] Error updating bookmark:', error);
              return of(BookmarkActions.loadBookmarksFailure({ error: error.message }));
            })
          )
        )
      )
    );
  }
}
