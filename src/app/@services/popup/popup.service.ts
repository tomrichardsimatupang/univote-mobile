import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private readonly alertController: AlertController
  ) { }

  generalError(error: any) {

    if( [401,403,409].includes(error.status)) {
      this.alertController.create({
        header: error.error.title,
        message: error.error.message,
        buttons: ['Kembali']
      }).then(alert => alert.present());
    }else if( error.status === 500 ) {
      this.alertController.create({
        header: "Terjadi Kesalahan",
        message: "Silahkan ulang kembali",
        buttons: ['Kembali']
      }).then(alert => alert.present());
    }else if( error.status === 404 ) {
      this.alertController.create({
        header: "Url Tidak Ditemukan",
        message: "Tunggu Sebentar kami akan memperbaiki masalah ini.",
        buttons: ['Kembali']
      }).then(alert => alert.present());
    }else if( error.status === 405 ) {
      this.alertController.create({
        header: "Method Not Allowed",
        message: "Tunggu Sebentar kami akan memperbaiki masalah ini.",
        buttons: ['Kembali']
      }).then(alert => alert.present());
    }

  }

  permissionDenied() {
    const popup = this.alertController.create({
      header: "Permission Denied",
      message: "Silahkan berikan akses untuk melanjutkan.",
      buttons: ['Mengerti']
    });
    popup.then(alert => {
      alert.onDidDismiss().then(() => {
        location.reload();
      });
      alert.present()
    });
  }

}
