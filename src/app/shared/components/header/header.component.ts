import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterBookmarks } from '@app/store/bookmarks.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showPlusIcon = true;
  constructor(
    private store: Store,
    private router: Router
  ) {}

  filterBookmarks(query: string): void {
    this.store.dispatch(filterBookmarks({ query }));
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) =>
      event instanceof NavigationEnd)).subscribe((url: NavigationEnd) => {
      this.showPlusIcon = url.urlAfterRedirects !== '/bookmarks/create' && !url.urlAfterRedirects.startsWith('/bookmarks/edit');
    });
  }
}
