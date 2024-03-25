import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SignUpPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
