import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Experience } from '../shared/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  getExperience() {
    return this.http
      .get<Array<Experience>>('http://localhost:8080/experience')
      .pipe(catchError(this.handleError));
  }

  saveExperience(experience: Experience) {
    return this.http
      .post('http://localhost:8080/experience/save', experience)
      .pipe(catchError(this.handleError));
  }

  deleteExperience(id: number) {
    return this.http
      .delete('http://localhost:8080/experience/delete/' + id, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  editExperience(experience: Experience) {
    return this.http
      .put('http://localhost:8080/experience/edit/' + experience.id, experience)
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
