import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksListComponent } from '@app/bookmarks/bookmarks-list/bookmarks-list.component';
import { BookmarksCreateComponent } from '@app/bookmarks/bookmarks-create/bookmarks-create.component';
import { BookmarksEditComponent } from '@app/bookmarks/bookmarks-edit/bookmarks-edit.component';

const routes: Routes = [
  { path: '', component: BookmarksListComponent },
  { path: 'create', component: BookmarksCreateComponent },
  { path: 'edit/:id', component: BookmarksEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule {}
