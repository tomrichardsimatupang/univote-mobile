import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, catchError, map, takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/@services/popup/loader.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../@services/http/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnDestroy {

  deployUrl = environment.deployUrl;

  unsubscribe$ = new Subject<void>();

  loaderService = inject(LoaderService);
  authService = inject(AuthService);

  constructor() { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  withLoader( request: Observable<any>, open = true ) {

    if(open) {
      this.loaderService.open();
    }

    return request.pipe(takeUntil(this.unsubscribe$)).pipe(map((value: any) => {
      if( value ) {
        this.loaderService.close();
      }
      return value;
    }), catchError((error) => {
      this.loaderService.close();
      throw error;
    }));

  }

}
