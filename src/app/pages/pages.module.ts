import { FailureNotificationsModule } from './custom/failure-notifications/failure-notifications.module';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardModule as CustomDashboardModule } from './custom/dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersModule } from './custom/users/users.module';
import { PlantsModule } from './custom/plants/plants.module';
import { ProfilesModule } from './custom/profiles/profiles.module';
import { RoundTemplateModule } from './custom/round-template/round-template.module';
import { SystemsTypeModule } from './custom/systems-type/systems-type.module';
import { MeasurementUnitsModule } from './custom/measurement-units/measurement-units.module';
import { RoundReportsModule } from './custom/round-reports/round-reports.module';
import { ManeuverGuideTemplateModule } from './custom/maneuver-guide-template/maneuver-guide-template.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    CustomDashboardModule,
    PlantsModule,
    RoundTemplateModule,
    FailureNotificationsModule,
    RoundReportsModule,
    SystemsTypeModule,
    ManeuverGuideTemplateModule,
    MeasurementUnitsModule,
    UsersModule,
    ProfilesModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
