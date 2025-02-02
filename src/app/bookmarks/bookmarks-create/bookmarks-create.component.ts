import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Bookmark } from '@app/models/bookmark.interface';
import { createBookmark } from '@app/store/bookmarks.actions';

@Component({
  standalone: false,
  selector: 'app-bookmarks-create',
  templateUrl: './bookmarks-create.component.html',
  styleUrls: ['./bookmarks-create.component.scss']
})
export class BookmarksCreateComponent {
  bookmarkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.bookmarkForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  onSubmit(): void {
    if (this.bookmarkForm.valid) {
      const newBookmark: Bookmark = {
        id: String(Date.now()),
        name: this.bookmarkForm.value.name,
        url: this.bookmarkForm.value.url,
        createdAt: new Date().toISOString()
      };

      this.store.dispatch(createBookmark({ bookmark: newBookmark }));
      this.router.navigate(['/bookmarks']);
    }
  }
}
