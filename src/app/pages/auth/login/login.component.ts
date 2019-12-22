import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { UserBasicData } from '../../../@models/general';
import { NgForm } from '@angular/forms';
import { MessagesChannelsEnum, MessagesTypeEnum } from '../../../constants/message-bus.enum';
import { MessageBusService } from '../../../services/message-bus.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  loading: boolean;

  constructor(
      authService: NbAuthService,
      changeDetectorRef: ChangeDetectorRef,
      router: Router,
      private generalService: GeneralService,
      private messageBus: MessageBusService,
      private toastService: NbToastrService,
    ) {
    super(authService, {}, changeDetectorRef, router);
    localStorage.setItem('host', '')
  }

  async loginUser({form}: NgForm) {
    this.loading = true;
    const userData: UserBasicData =  {
      username: form.controls.username.value,
      password: form.controls.password.value,
    };

    let token;
    try {
      const response = await this.generalService.login(userData);
      token = response.accessToken;
      localStorage.setItem('token', token);
      this.loading = true;
    } catch (e) { }

    try {
      const userInfo = await this.generalService.getUserInfo();
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.messageBus.publish(MessagesChannelsEnum.USER, MessagesTypeEnum.INFO, userInfo);
      this.router.navigate(['pages/dashboard']);
      this.loading = true;
    } catch (error) {
      this.toastService.danger('Posiblemente los datos son incorrectos', 'Inicio de Sesión')
    } finally { this.loading = false; }
  }
}
