import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
  static currentEnvironment: any = {};
  constructor(private inj: Injector) {}
  loadEnvironment(file: string) {
    const origin = window.location.origin;
    const http = this.inj.get(HttpClient);
    if (file) {
      return http.get(`${origin}/assets/config/${file}`).toPromise()
      .then(data => {
          EnvironmentService.currentEnvironment = data;
      });
    }
  }
}
