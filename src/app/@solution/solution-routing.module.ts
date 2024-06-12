import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./components/automation/users/user.component";
import { SolutionComponent } from "./solution.component";
// const routes: Routes = 
// [
//     {
//         path: '', component: SolutionComponent,
//         children: [
//             {
//                 path: 'settings',
//                 loadChildren: () => import('./components/automation/automation.module').then(x => x.AutomationModule)
//             }
//         ]
//     }
// ]
const routes: Routes = [
    {
      component:SolutionComponent,
      path: 'user',
      loadChildren: () => import('./components/automation/automation.module').then(m => m.AutomationModule),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'user'
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SolutionRoutingModule {

}