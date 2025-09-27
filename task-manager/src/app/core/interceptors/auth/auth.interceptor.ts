import { HttpInterceptorFn ,HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorage } from '../../token-storage';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = TokenStorage.get();
      const authReq = token ? req.clone({setHeaders: {Authorization:`Bearer ${token}`}}) : req;
      return next.handle(authReq).pipe(
        catchError((err: HttpErrorResponse)=>{
          if(err.status == 401) {
            TokenStorage.clear();
            this.router.navigate(["/login"]);
          }
          return throwError(()=>err);
        }
      )
  )
  }
}