import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksEditComponent } from './bookmarks-edit.component';

describe('BookmarksEditComponent', () => {
  let component: BookmarksEditComponent;
  let fixture: ComponentFixture<BookmarksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
