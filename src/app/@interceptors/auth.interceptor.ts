import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../@services/http/auth.service';
import { PopupService } from '../@services/popup/popup.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly popupService: PopupService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authService.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.accessToken}`,
        },
      })
    }


    return next.handle(request).pipe(
      catchError( error => {
        this.popupService.generalError(error);
        return throwError( () => error );
      })
    );

  }
}
