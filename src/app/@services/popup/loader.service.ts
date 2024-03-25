import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: any;

  constructor(
    private readonly loadingCtrl: LoadingController
  ) { }

  open() {
    this.showLoading();
  }

  close() {
    this.hideLoading();
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'menunggu',
      duration: 3000,
    });
    this.loading.present();
  }

  private async hideLoading() {
    if(this.loading) {
      this.loading.dismiss();
    }
  }

}
