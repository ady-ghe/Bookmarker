import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '@app/models/bookmark.interface';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private apiUrl = 'http://localhost:3000/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    console.log('[Service] Create bookmark:', bookmark );
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    const idAsString = String(bookmark.id);
    const url = `${this.apiUrl}/${idAsString}`;
    console.log('[Service] PUT URL:', url);
    console.log('[Service] Editing bookmark:', bookmark);
    return this.http.put<Bookmark>(url, bookmark);
  }

}
