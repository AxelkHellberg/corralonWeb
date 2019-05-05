import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardPageComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './custom/dashboard/dashboard.component';
import { FailureNotificationsComponent } from './custom/failure-notifications/failure-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'failure-notifications',
        component: FailureNotificationsComponent,
      },
      {
        path: 'edashboard',
        component: ECommerceComponent,
      },
      {
        path: 'iot-dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      },
      {
        path: 'modal-overlays',
        loadChildren:
          './modal-overlays/modal-overlays.module#ModalOverlaysModule',
      },
      {
        path: 'extra-components',
        loadChildren:
          './extra-components/extra-components.module#ExtraComponentsModule',
      },
      {
        path: 'bootstrap',
        loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
      },
      {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
      },
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      },
      {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
