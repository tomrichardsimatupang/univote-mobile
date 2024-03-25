import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SignInPayload } from 'src/app/@services/http/auth.service';
import { BaseComponent } from '@app/@core/base/base.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})
export class SignInPage extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    private navCtrl: NavController
  ) { super(); }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    /** empty */

    this.withLoader(this.authService.postTokenVerify())
      .subscribe({
        next: (response) => {
          this.navCtrl.navigateRoot('/app');
        },
        error: (error) => {
          this.authService.clearLogin();
        }
      })

  }

  signIn() {

    const payload = this.form.getRawValue() as SignInPayload;

    this.withLoader(this.authService.postSignIn(payload))
      .subscribe({
        next: (response) => {
          this.authService.saveUserData(response);
          this.navCtrl.navigateRoot('/app');
        },
        error: (error) => { }
      });

  }

  signUp() {
    this.navCtrl.navigateRoot('/sign-up');
  }

}
