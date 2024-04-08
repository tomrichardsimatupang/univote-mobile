import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private readonly navCtrl: NavController
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userData = sessionStorage.getItem('userData');
    const accessToken = sessionStorage.getItem('accessToken');
    const next = !!userData && !!accessToken;
    if(!next) {
      this.navCtrl.navigateRoot('/sign-in');
    }
    return next;
  }

}
