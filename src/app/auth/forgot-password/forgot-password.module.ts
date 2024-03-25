import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPage } from './forgot-password.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ForgotPasswordPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
