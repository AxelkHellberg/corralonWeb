import { environment } from './../environments/environment';
import { CanAccessGuard } from './guards/can-access.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from './services/general.service';
import { MessageBusService } from './services/message-bus.service';
import { EnvironmentService } from './services/environment.service';





export function init_environment(env: EnvironmentService) {
  return () => env.loadEnvironment(environment['configFile'] || '');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  
    ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init_environment,
      deps: [EnvironmentService],
      multi: true
    },
    GeneralService,
    MessageBusService,
    CanAccessGuard,
  ],
})
export class AppModule {
}
