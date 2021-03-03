import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');

    let request = req

    if(token){
      request = req.clone({
        setHeaders: {
          authorization: `${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status === 401){
          this.router.navigateByUrl('/login')
        }
        return throwError(err)
      })
    )
  }
}
