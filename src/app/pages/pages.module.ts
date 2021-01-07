import { FailureTypesModule } from './custom/failure-types/failure-types.module';
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
import { SystemListModule } from './custom/system-list/system-list.module';
import { EquipmentModule } from './custom/equipment/equipment.module';
import { NewManeuverGuideTemplateModule } from './custom/new-maneuver-guide-template/new-maneuver-guide-template.module';
import { NewRoundTemplateModule } from './custom/new-round-template/new-round-template.module';
import { LoginComponentModule } from './auth/login/login.module';
import { RegisterComponentModule } from './auth/register/register.module';
import { ManeuverGuideReportsModule } from './custom/maneuver-guide-reports/maneuver-guide-reports.module';
import { TagListModule } from './custom/tag-list/tag-list.module';
import { TagEquipmentModule } from './custom/tag-equipment/tag-equipment.module';
import { TagSystemModule } from './custom/tag-system/tag-system.module';
import {TareaModule} from './custom/tarea/tarea.module';


import { CalendarioModule } from './custom/calendario/calendario.module';
import { NbCalendarModule, NbDatepickerModule, NbListModule } from '@nebular/theme';
import { NuevaTareaModule } from './custom/nueva-tarea/nueva-tarea.module';

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
    FailureTypesModule,
    EquipmentModule,
    RoundReportsModule,
    ManeuverGuideReportsModule,
    SystemListModule,
    SystemsTypeModule,
    ManeuverGuideTemplateModule,
    NewManeuverGuideTemplateModule,
    NewRoundTemplateModule,
    MeasurementUnitsModule,
    UsersModule,
    ProfilesModule,
    ECommerceModule,
    MiscellaneousModule,
    LoginComponentModule,
    RegisterComponentModule,
    TagListModule,
    TagEquipmentModule,
    TagSystemModule,
    CalendarioModule,
    NbCalendarModule,
    TareaModule,
    NuevaTareaModule,
    NbListModule,
    NbDatepickerModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    //CalendarioComponent,
    
  ],
})
export class PagesModule {
}
