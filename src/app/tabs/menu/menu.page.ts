import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { UserData } from '@app/@services/http/auth.service';
import { MobileService } from '@app/@services/http/mobile.service';
import { NavController } from '@ionic/angular';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage extends BaseComponent {

  userData: UserData;
  enableProfilingDetail = false;

  constructor(
    private readonly navCtrl:NavController,
    private readonly mobileService: MobileService
  ) {
    super();
    this.userData = this.authService.getUserData();
  }

  navigateTo(path: string) {
    this.navCtrl.navigateRoot(path);
  }

  ionViewWillEnter() {
    this.checkProfilingDetail();
  }

  checkProfilingDetail() {
    this.mobileService.getProfilingDetail(true)
      .subscribe({
      next: (response) => {
        this.enableProfilingDetail = true;
      }
    })
  }

}
