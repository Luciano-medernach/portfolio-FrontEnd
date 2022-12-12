import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Proyect } from '../shared/proyect.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectService {
  constructor(private http: HttpClient) {}

  getProyects() {
    return this.http
      .get<Array<Proyect>>('http://localhost:8080/proyects')
      .pipe(catchError(this.handleError));
  }

  saveProyect(proyect: Proyect) {
    return this.http
      .post<Proyect>('http://localhost:8080/proyects/save', proyect)
      .pipe(catchError(this.handleError));
  }

  editProyect(proyect: Proyect) {
    return this.http
      .put('http://localhost:8080/proyects/edit/' + proyect.id, proyect)
      .pipe(catchError(this.handleError));
  }

  deleteProyect(id: any) {
    return this.http
      .delete('http://localhost:8080/proyects/delete/' + id, {
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
