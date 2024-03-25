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
    }

  }


}
