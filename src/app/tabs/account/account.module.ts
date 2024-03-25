import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPage } from './account.page';

import { Tab3PageRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab3PageRoutingModule
  ],
  declarations: [AccountPage]
})
export class Tab3PageModule {}
