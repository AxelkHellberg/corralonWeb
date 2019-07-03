import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

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
  ) {
    super(authService, {}, changeDetectorRef, router);
   }

}
