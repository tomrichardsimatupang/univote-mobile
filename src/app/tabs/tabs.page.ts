import { Component } from '@angular/core';

import { addIcons } from 'ionicons';
import { chatbubble, apps, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
    addIcons({ chatbubble, apps, person });
  }

}
