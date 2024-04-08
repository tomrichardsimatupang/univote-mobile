import { Component } from '@angular/core';
import { AuthService, UserData } from '../../@services/http/auth.service';
import { NavController } from '@ionic/angular';
import { BaseComponent } from '@app/@core/base/base.component';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage extends BaseComponent {

  userData: UserData | null;

  constructor(
    private readonly navCtrl: NavController
  ) {
    super();
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
