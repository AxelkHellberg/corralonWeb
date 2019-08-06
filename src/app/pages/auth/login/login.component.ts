import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { UserBasicData } from '../../../@models/general';
import { NgForm } from '@angular/forms';
import { MessagesChannelsEnum, MessagesTypeEnum } from '../../../constants/message-bus.enum';
import { MessageBusService } from '../../../services/message-bus.service';

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
      private messageBus: MessageBusService,
    ) {
    super(authService, {}, changeDetectorRef, router);
  }

  async loginUser(form: NgForm) {
    const userData: UserBasicData =  {
      username: form.form.controls.username.value,
      password: form.form.controls.password.value,
    };
    let token;
    try {
      const response = await this.generalService.login(userData);
      token = response.accessToken;
      localStorage.setItem('token', token);
    } catch (e) {
    }

    try {
      const userInfo = await this.generalService.getUserInfo();
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.messageBus.publish(MessagesChannelsEnum.USER, MessagesTypeEnum.INFO, userInfo);
      this.router.navigate(['pages/dashboard']);
    } catch (error) {

    }
  }
}
