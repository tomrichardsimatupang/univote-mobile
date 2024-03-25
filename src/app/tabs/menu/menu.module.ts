import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from './menu.page';

import { Tab2PageRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab2PageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
