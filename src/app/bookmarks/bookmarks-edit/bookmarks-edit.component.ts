import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Bookmark } from '@app/models/bookmark.interface';
import { selectAllBookmarks, selectBookmarkById } from '@app/store/bookmarks.selectors';
import { editBookmark, loadBookmarks } from '@app/store/bookmarks.actions';

@Component({
  standalone: false,
  selector: 'app-bookmarks-edit',
  templateUrl: './bookmarks-edit.component.html',
  styleUrls: ['./bookmarks-edit.component.scss']
})
export class BookmarksEditComponent implements OnInit {
  bookmarkForm: FormGroup;
  bookmarkId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookmarkForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.bookmarkId = Number(this.route.snapshot.paramMap.get('id')!);
    this.store.dispatch(loadBookmarks());
    if (this.bookmarkId) {
      this.store.select(selectBookmarkById(this.bookmarkId))
        .pipe(filter(bookmark => !!bookmark))
        .subscribe((bookmark) => {
          console.log('Found bookmark:', bookmark);
          this.bookmarkForm.patchValue({
            name: bookmark.name,
            url: bookmark.url
          });
        });
    }
  }
  onSubmit(): void {
    if (this.bookmarkForm.valid && this.bookmarkId !== undefined) {
      const updatedBookmark: Bookmark = {
        id: this.bookmarkId,
        name: this.bookmarkForm.value.name,
        url: this.bookmarkForm.value.url,
        createdAt: new Date().toISOString()
      };

      this.store.dispatch(editBookmark({ bookmark: updatedBookmark }));
      this.router.navigate(['/bookmarks']);
    }
  }


}
