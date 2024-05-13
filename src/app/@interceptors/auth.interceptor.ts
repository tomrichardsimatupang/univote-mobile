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
import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly popupService: PopupService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const domain = environment.apiUrl;

    if(this.authService.isLoggedIn() && request.url.includes(domain) ) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.accessToken}`,
        },
      })
    }

    return next.handle(request).pipe(
      catchError( error => {
        const skipErrorCode = ["400129"];
        if(!skipErrorCode.includes(error?.error?.code)) {
          this.popupService.generalError(error);
        }
        return throwError( () => error );
      })
    );

  }
}
