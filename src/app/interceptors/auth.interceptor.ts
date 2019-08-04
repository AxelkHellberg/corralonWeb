import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }

  if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500 && err.error.userMessage === 'TokenExpiredError: jwt expired') {
          this.router.navigateByUrl('auth/login');
          localStorage.removeItem('token');
        }

        return throwError( err );

      })
    );
  }

}
