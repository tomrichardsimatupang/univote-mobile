import { Component } from '@angular/core';
import { AuthService } from './@services/http/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  forceMobile = false;

  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.loadUserData();

    if (this.isMobile()) {
      this.forceMobile = false;
    }else {
      this.forceMobile = true;
    }

  }

  isMobile() {
    return window.innerWidth <= 768; // Adjust this threshold as needed
  }

}
