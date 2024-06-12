import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutamationComponent } from './automation.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserComponent } from './users/user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {
}
