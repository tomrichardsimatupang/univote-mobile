import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';
import { addIcons } from 'ionicons';
import { arrowBack, scan } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit, OnDestroy {

  allowedFormats: BarcodeFormat[];
  availableDevices: MediaDeviceInfo[] | undefined;
  cameraDevice: any;
  scannerEnabled = false;

  constructor(
    private readonly navCtrl: NavController
  ) {
    addIcons({scan, arrowBack});
    this.allowedFormats = [BarcodeFormat.QR_CODE];
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.scannerEnabled = false;
  }

  camerasFoundHandler(mediaDevice: MediaDeviceInfo[]) {
    const waitDeviceReady = 1000;
    setTimeout(() => {
      this.availableDevices = mediaDevice;
      this.cameraDevice = this.availableDevices[0];
      this.scannerEnabled = true;
    }, waitDeviceReady);
  }
  camerasNotFoundHandler($event: any) {
    /** empty */
  }
  scanSuccessHandler(event: string) {
  throw new Error('Method not implemented.');
  }
  scanCompleteHandler(event: Result) {
  }
  scanErrorHandler(error: Error) {
    console.log(error);
  }

  navigateBack() {
    this.navCtrl.navigateRoot("/app/menu");
  }

}
