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

  constructor(
    private readonly navCtrl: NavController
  ) { }

  ngOnInit() {
    try {
      const error = sessionStorage.getItem("scan-error");
      this.error = JSON.parse(error || '');
    }catch(e) { /** empty */ }
  }

  retry() {
    this.navCtrl.navigateRoot('/vote/scan');
  }

}
