import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';
import { addIcons } from 'ionicons';
import { arrowBack, scan } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { HardwareService } from '../../@services/hardware/hardware.service';
import { MobileService } from '../../@services/http/mobile.service';
import { PopupService } from '../../@services/popup/popup.service';
import { BaseComponent } from '@app/@core/base/base.component';
import { AuthService } from '../../../../../univote-frontend/src/app/@services/http/auth/auth.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage extends BaseComponent implements OnInit, OnDestroy {

  allowedFormats: BarcodeFormat[];
  availableDevices: MediaDeviceInfo[] | undefined;
  cameraDevice: any;
  scannerEnabled = false;
  isMobile = false;

  currentTimeout: any;

  allreadyRequest = false;

  constructor(
    private readonly navCtrl: NavController,
    private readonly hardwareService: HardwareService,
    private readonly mobileService: MobileService,
    private readonly popupService: PopupService
  ) {
    super();
    addIcons({scan, arrowBack});
    this.allowedFormats = [BarcodeFormat.QR_CODE];
  }

  ngOnInit() {
    this.isMobile = this.hardwareService.isMobileDevice();
    this.scannerEnabled = true;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.scannerEnabled = false;
    clearTimeout(this.currentTimeout);
  }

  camerasFoundHandler(mediaDevice: MediaDeviceInfo[]) {
    const waitDeviceReady = 1500;
    this.currentTimeout = setTimeout(() => {
      this.availableDevices = mediaDevice;
      if(this.isMobile) {
        let selectedDevice = mediaDevice.find(info => info.label.toLowerCase().includes("back camera"));
        if(!selectedDevice) {
          selectedDevice = mediaDevice.find(info => info.label.toLowerCase().includes("back"));
        }
        if(!selectedDevice) {
          selectedDevice = this.availableDevices[0];
        }
        this.cameraDevice = selectedDevice;
        this.scannerEnabled = true;
      }else {
        this.cameraDevice = this.availableDevices[0];
        this.scannerEnabled = true;
      }
    }, waitDeviceReady);
  }

  camerasNotFoundHandler($event: any) {
    /** empty */
  }

  scanSuccessHandler(event: string) {

    if(this.allreadyRequest) {
      return;
    }
    this.allreadyRequest = true;

    this.withLoader(
        this.mobileService.postVoteCheckin(event)
      ).subscribe({
        next: (response) => {
          this.navCtrl.navigateRoot('/vote/candidate-list');
        },
        error: (error) => {
          sessionStorage.setItem("scan-error", JSON.stringify(error.error));
          this.navCtrl.navigateRoot('/vote/scan-failed');
        }
      });
  }

  scanCompleteHandler(event: Result) {
  }

  scanErrorHandler(error: Error) {
    /** empty */
  }

  navigateBack() {
    this.navCtrl.navigateRoot("/app/menu");
  }

}
