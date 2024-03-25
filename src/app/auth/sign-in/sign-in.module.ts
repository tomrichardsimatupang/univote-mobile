import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignInPage } from './sign-in.page';


@NgModule({
  declarations: [
    SignInPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SignInRoutingModule
  ]
})
export class SignInModule { }
