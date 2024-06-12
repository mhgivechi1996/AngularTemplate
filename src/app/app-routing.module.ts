import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'automation',
    loadChildren: () => import('./@solution/solution.module').then(m => m.SolutionModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'automation'
  }
];
const routerOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule],
  providers: [
    
  ],
})
export class AppRoutingModule {
}
