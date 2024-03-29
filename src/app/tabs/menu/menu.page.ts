import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage extends BaseComponent {

  constructor() {
    super();
  }

}
