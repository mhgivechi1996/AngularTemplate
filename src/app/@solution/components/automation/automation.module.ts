import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutomationRoutingModule } from './automation.routing.module';
import { AutamationComponent } from './automation.component';
//import { UserFormComponent } from './users/user-form/user-form.component';
import { UserComponent } from './users/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { NbCardModule } from '@nebular/theme';

const routedComponents = [AutamationComponent];
@NgModule({
  imports: [
    AutomationRoutingModule,
    NbCardModule
  ],
  declarations: [
    routedComponents,
    UserComponent,
    UserFormComponent
  ],
  entryComponents: [
    //UserComponent,
    UserFormComponent
  ],
  exports: [],
  providers: [
    
  ],
})
export class AutomationModule {
}
