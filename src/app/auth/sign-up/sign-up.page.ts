import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '@app/@services/http/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    nim: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    faculty_id: new FormControl('', [Validators.required]),
    faculty_name: new FormControl({value:'', disabled:true}),
    major_id: new FormControl('', [Validators.required]),
    major_name: new FormControl({value:'', disabled:true}),
    email: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly navCtrl: NavController,
    private readonly authService: AuthService,
    private readonly alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  postSignUp() {

    const payload = this.form.getRawValue();

    this.authService.postSignUp( payload ).subscribe({
      next: (response) => {
        this.showAlertSuccess(response)

      },
      error: () => {
      }
    });

  }

  navToSignIn() {
    this.navCtrl.navigateRoot('/sign-in');
  }

  onChangeSelect( key: string, event: any ) {
    this.form.get(key)?.setValue( event.target.value );
  }

  checkValidNim(event: any) {

    const value = event.target.value;

    this.authService.postCheckNim({nim:value}).subscribe({
      next: (response: any) => {
        this.form.patchValue(response);
      }
    });

  }

  async showAlertSuccess(response: any) {
    const alert = await this.alertController.create({
      header: "Pendaftaran Berhasil",
      message: response.message,
      buttons: [{
        text: 'Kembali',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    await alert.present().then(() => this.navToSignIn());
  }

}
