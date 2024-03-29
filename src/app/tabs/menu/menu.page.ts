import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage extends BaseComponent {

  constructor(
    private readonly navCtrl:NavController
  ) {
    super();
  }

  navigateTo(path: string) {
    this.navCtrl.navigateRoot(path);
  }

}
