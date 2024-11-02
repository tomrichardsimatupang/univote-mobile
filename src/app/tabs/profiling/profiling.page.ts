import { Component, OnInit, ViewChild } from '@angular/core';
import { MobileService } from '../../@services/http/mobile.service';
import { AlertController, IonInput, NavController } from '@ionic/angular';
import { DocumentumService } from '../../@services/http/documentum.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.page.html',
  styleUrls: ['./profiling.page.scss'],
})
export class ProfilingPage implements OnInit {

  @ViewChild('ionInputPhone', { static: true }) ionInputPhone!: IonInput;

  profile: any = {};
  context: any = {};

  form: FormGroup = new FormGroup({
    candidate_id: new FormControl('', [Validators.required]),
    candidate_contact: new FormControl('', [Validators.required]),
    candidate_vision: new FormControl('', [Validators.required]),
    candidate_mission: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly navCtrl: NavController,
    private readonly mobileService: MobileService,
    private readonly documentumService: DocumentumService,
    private readonly alertController: AlertController
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.fetchProfilingDetail();
  }

  fetchProfilingDetail() {
    this.mobileService.getProfilingDetail().subscribe({
      next: (profile) => {
        this.profile = profile;
        if(profile.candidate_photo) {
          this.documentumService.getPhotoCandidate(profile.candidate_photo)
            .subscribe((file: FileReader) => {
              file.onload = () => {
                this.context.photo = file.result;
              }
            });
        }
        this.form.patchValue(profile);
      },
      error: (error) => {
        this.navCtrl.navigateRoot('/app/home');
      }
    });
  }

  send() {

    const payload = this.form.getRawValue();

    this.mobileService.postProfilingUpdate(payload).subscribe({
      next: (response) => {
        this.showAlertSuccess();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  phoneFilter( ev: any ) {
    const phoneNumber = ev.target!.value;
    // Menghilangkan spasi, strip, kurung, dan karakter non-digit
    let sanitizedNumber = phoneNumber.replace(/\D/g, '');
    // Menghapus awalan '0' jika ada
    if (sanitizedNumber.startsWith('0')) {
      sanitizedNumber = sanitizedNumber.substring(1);
    }
    if (sanitizedNumber.length > 13) {
      sanitizedNumber = sanitizedNumber.substring(0, 13);
    }
    this.ionInputPhone.value = sanitizedNumber;
  }

  async showAlertSuccess() {
    const alert = await this.alertController.create({
      header: "Berhasil",
      message: "Profil berhasil di kirim",
      buttons: [{
        text: 'Kembali',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    await alert.present();
  }

}
