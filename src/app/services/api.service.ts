import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ITextNotes } from '../text-notes/text-notes.model';
import Swal from 'sweetalert2';

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
        catchError(this._handleError)
      );
  }

  get(endpoint: string, id: Number): Observable<ITextNotes> {
    return this.http.get<ITextNotes>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(this._handleError)
      );
  }

  post(endpoint: string, data: ITextNotes): Observable<ITextNotes> {
    return this.http.post<ITextNotes>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        map(response => response),
        catchError(this._handleError)
      );
  }

  put(endpoint: string, data: ITextNotes): Observable<ITextNotes> {
    return this.http.put<ITextNotes>(`${this.baseUrl}/${endpoint}/${data.id}`, data)
      .pipe(
        map(response => response),
        catchError(this._handleError)
      );
  }

  delete(endpoint: string, id: Number | undefined): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(
        map(() => true),
        catchError(this._handleError)
      );
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = error.error;

    Swal.fire({
      title: 'Oops! Ocorreu um erro',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Fechar'
    });
    return throwError(() => new Error(errorMessage));
  }
}
