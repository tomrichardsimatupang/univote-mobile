import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { LogoModule } from '../../@component/logo/logo.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LogoModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
