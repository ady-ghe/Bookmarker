import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmarksCreateComponent } from '@app/bookmarks/bookmarks-create/bookmarks-create.component';
import { BookmarksEditComponent } from '@app/bookmarks/bookmarks-edit/bookmarks-edit.component';
import { BookmarksListComponent } from '@app/bookmarks/bookmarks-list/bookmarks-list.component';
import { BookmarksRoutingModule } from '@app/bookmarks/bookmarks-routing.module';

@NgModule({
  declarations: [BookmarksListComponent, BookmarksCreateComponent, BookmarksEditComponent],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCard,
    MatIcon,
    MatTooltip
  ]
})
export class BookmarksModule {}
