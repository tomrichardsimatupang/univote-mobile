import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan-failed',
  templateUrl: './scan-failed.page.html',
  styleUrls: ['./scan-failed.page.scss'],
})
export class ScanFailedPage implements OnInit {

  error: any = {
    message: "Terdapat kegagalan pada saat scan, silahkan ulangi"
  };

  isEnableRetry = true;

  constructor(
    private readonly navCtrl: NavController
  ) { }

  ngOnInit() {
    try {
      const error = sessionStorage.getItem("scan-error");
      this.error = JSON.parse(error || '');
      if(["408229", "408230", "408231"].includes(this.error.code)) {
        this.isEnableRetry = false;
      }
    }catch(e) { /** empty */ }
  }

  retry() {
    this.navCtrl.navigateRoot('/vote/scan');
  }

  backToMenu() {
    this.navCtrl.navigateRoot('/app/menu');
  }



}
