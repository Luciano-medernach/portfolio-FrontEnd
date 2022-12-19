import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  saveImage(image: any) {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http
      .post('http://localhost:8080/image/save', formData)
      .pipe(catchError(this.handleError));
  }

  getImage(id: any) {
    return this.http
      .get('http://localhost:8080/image/get/' + id)
      .pipe(catchError(this.handleError));
  }

  editImage(id: any, image: any) {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http
      .put('http://localhost:8080/image/edit/' + id, formData)
      .pipe(catchError(this.handleError));
  }

  deleteImage(id: any) {
    return this.http
      .delete('http://localhost:8080/image/delete/' + id, {
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
