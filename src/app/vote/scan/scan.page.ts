import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';
import { addIcons } from 'ionicons';
import { arrowBack, scan } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { HardwareService } from '../../@services/hardware/hardware.service';
import { MobileService } from '../../@services/http/mobile.service';
import { PopupService } from '../../@services/popup/popup.service';
import { BaseComponent } from '@app/@core/base/base.component';

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
    this.scannerEnabled = false;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.scannerEnabled = false;
    clearTimeout(this.currentTimeout);
  }

  findBackCamera(mediaDevice: MediaDeviceInfo[]): MediaDeviceInfo {
    return mediaDevice[mediaDevice.length-1];
  }

  camerasFoundHandler(mediaDevice: MediaDeviceInfo[]) {
    this.scannerEnabled = false;
    const waitDeviceReady = 1500;
    this.currentTimeout = setTimeout(() => {
      this.availableDevices = mediaDevice.filter( x => !x.label.toLowerCase().includes('virtual') );
      const backCamera = this.findBackCamera(this.availableDevices);
      if(this.isMobile) {
        this.cameraDevice = backCamera;
        this.scannerEnabled = true;
      }else {
        this.cameraDevice = backCamera;
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
