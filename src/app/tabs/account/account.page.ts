import { Component } from '@angular/core';
import { AuthService, UserData } from '../../@services/http/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  userData: UserData | null;

  constructor(
    private readonly authService: AuthService,
    private readonly navCtrl: NavController
  ) {
    this.authService.loadUserData();
    this.userData = this.authService.userData;
  }

  signOut() {

    this.authService.postSignOut({}).subscribe({
      next: (res) => {
        this.authService.clearLogin();
        this.navCtrl.navigateRoot("/sign-in");
      },
      error: (error) => {

      }
    })

  }

}
