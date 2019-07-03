import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { UserData } from '../../../@models/general';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

  constructor(
    authService: NbAuthService,
    changeDetectorRef: ChangeDetectorRef,
    router: Router,
    private generalService: GeneralService,
  ) {
    super(authService, {}, changeDetectorRef, router);
   }

  async registerUser(form: NgForm) {
    const userData: UserData = {
      name: form.form.controls.name.value,
      lastName: form.form.controls.lastName.value,
      username: form.form.controls.username.value,
      password: form.form.controls.password.value,
      dni: form.form.controls.dni.value,
      fileNumber: '5',
    }
    try {
      await this.generalService.createUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

}
