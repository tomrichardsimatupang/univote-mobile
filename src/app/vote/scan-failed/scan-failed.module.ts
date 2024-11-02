import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanFailedPageRoutingModule } from './scan-failed-routing.module';

import { ScanFailedPage } from './scan-failed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanFailedPageRoutingModule
  ],
  declarations: [ScanFailedPage]
})
export class ScanFailedPageModule {}
