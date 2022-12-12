import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Education } from '../shared/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  constructor(private http: HttpClient) {}

  getEducation() {
    return this.http
      .get<Array<Education>>('http://localhost:8080/education')
      .pipe(catchError(this.handleError));
  }

  saveEducation(education: Education) {
    return this.http
      .post<Education>('http://localhost:8080/education/save', education)
      .pipe(catchError(this.handleError));
  }

  editEducation(education: Education) {
    return this.http
      .put('http://localhost:8080/education/edit/' + education.id, education)
      .pipe(catchError(this.handleError));
  }

  deleteEducation(id: any) {
    return this.http
      .delete('http://localhost:8080/education/delete/' + id, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
