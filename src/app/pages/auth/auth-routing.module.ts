import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent, NbAuthModule, NbRegisterComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { LoginComponentModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { RegisterComponentModule } from './register/register.module';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NbAuthModule, LoginComponentModule, RegisterComponentModule],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
