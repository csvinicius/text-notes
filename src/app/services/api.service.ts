import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ITextNotes } from '../interfaces/text-notes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://6709d2e3af1a3998baa26b1d.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<ITextNotes[]> {
    return this.http.get<ITextNotes[]>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  get(endpoint: string, id: Number): Observable<ITextNotes> {
    return this.http.get<ITextNotes>(`${this.apiUrl}/${endpoint}/${id}`)
      .pipe(
        map(response => response),
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
