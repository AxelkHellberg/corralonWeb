import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { UserBasicData } from '../../../@models/general';
import { NgForm } from '@angular/forms';
import { MessagesChannelsEnum, MessagesTypeEnum } from '../../../constants/message-bus.enum';
import { MessageBusService } from '../../../services/message-bus.service';
import { NbToastrService } from '@nebular/theme';
import { error } from 'jquery';

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
      const response = await this.generalService.loginSinVerificacion(userData.username,userData.password);
      token = response.accessToken;
      console.log("token");
      console.log(token);
      localStorage.setItem('token', token);
      this.loading = true;
    } catch (e) { }

    try {
      const userInfo={
        createdAt: "2020-10-21T17:09:14.230Z",
        dni: "12345",
        fileNumber: "123",
        id: 2,
        lastName: "Software",
        name: "Administrador",
        password: userData.password,
        profile: {createdAt: "2020-10-21T17:09:04.604Z", updateAt: "2020-10-21T17:09:04.604Z", id: 1, name: "Administrador"},
        profileId: 1,
        updateAt: "2020-10-21T17:09:14.230Z",
        username: userData.username
      }
      console.log(userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.messageBus.publish(MessagesChannelsEnum.USER, MessagesTypeEnum.INFO, userInfo);
      const validacion = await this.generalService.loginValidacion(userData.username,userData.password);
      console.log("VALIDACION")
      console.log(validacion)
      if(validacion.length == 0){
        console.log("entre al error")
        throw "ERROR";
      }
      
      this.router.navigate(['pages/dashboard']);
      this.loading = true;
    } catch (error) {
      this.toastService.danger('Los datos ingresados son incorrectos', 'Inicio de Sesión')
    } finally { this.loading = false; }
  }
}
