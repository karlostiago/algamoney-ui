import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { Observable, from } from 'rxjs';
import {mergeMap} from 'rxjs/operators';

export class NotAuthenticatedError {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('/oauth/token') && this.authService.isAccessTokenInvalido()) {
      return from (this.authService.obterNovoAccessToken())
        .pipe (
          mergeMap (() => {

            if (this.authService.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }

            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(request);
          })
          );
        }

    return next.handle(request);
  }
}
