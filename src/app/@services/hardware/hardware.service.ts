import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  deviceId: string = "";

  constructor() {
  }

  isMobileDevice() {
    const regexMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regexMobile.test(navigator.userAgent);
  }

  getPermission(): any {

    return new Promise<string>((resolve, reject) => {
      const constraints = {
        video: { facingMode: "environment" }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          const tracks = mediaStream.getTracks();
          tracks.forEach(track => track.stop())
          this._getDevices(resolve,reject);
        }).catch((error) =>{
          if(error.name === 'NotAllowedError') {
            reject();
          }
        });
    });
  }

  private _getDevices( resolve: any, reject: any ) {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const device = devices.find((device) => device.kind === 'videoinput');
        if(device) {
          this.deviceId = device.deviceId;
          resolve(device.deviceId);
        }else {
          reject();
        }
      })
      .catch((err) => {
        reject();
      });
  }

}
