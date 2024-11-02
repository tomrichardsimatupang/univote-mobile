import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';

import { ScanPage } from './scan.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LogoModule } from '@app/@component/logo/logo.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LogoModule,
    ZXingScannerModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
