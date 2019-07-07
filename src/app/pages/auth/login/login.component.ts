import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { UserBasicData } from '../../../@models/general';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  constructor(
      authService: NbAuthService,
      changeDetectorRef: ChangeDetectorRef,
      router: Router,
      private generalService: GeneralService,
    ) {
    super(authService, {}, changeDetectorRef, router);
  }

  async loginUser(form: NgForm) {
    const userData: UserBasicData =  {
      username: form.form.controls.username.value,
      password: form.form.controls.password.value,
    };
    try {
      const response = await this.generalService.login(userData);
      localStorage.setItem('token', response.accessToken);
      this.router.navigate(['pages/dashboard']);
    } catch (e) {
      console.log(e);
    }
  }
}
