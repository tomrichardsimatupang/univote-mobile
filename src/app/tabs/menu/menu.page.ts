import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { UserData } from '@app/@services/http/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage extends BaseComponent {

  userData: UserData;

  constructor(
    private readonly navCtrl:NavController
  ) {
    super();
    this.userData = this.authService.getUserData();
  }

  navigateTo(path: string) {
    this.navCtrl.navigateRoot(path);
  }

}
