import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ITextNotes } from '../text-notes/text-notes.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://6709d2e3af1a3998baa26b1d.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<ITextNotes[]> {
    return this.http.get<ITextNotes[]>(`${this.baseUrl}/${endpoint}`)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  get(endpoint: string, id: Number): Observable<ITextNotes> {
    return this.http.get<ITextNotes>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  post(endpoint: string, data: ITextNotes): Observable<ITextNotes> {
    return this.http.post<ITextNotes>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  put(endpoint: string, id: Number | undefined, data: ITextNotes): Observable<ITextNotes> {
    return this.http.put<ITextNotes>(`${this.baseUrl}/${endpoint}/${id}`, data)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(endpoint: string, id: Number | undefined): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(
        map(() => true),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
