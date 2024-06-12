import { NgModule } from "@angular/core";
import { SolutionComponent } from './solution.component';
import { SolutionRoutingModule } from './solution-routing.module';
import { DataService } from "./services/common/data.service";
import { ThemeModule } from "../@theme/theme.module";
import { NbCardModule, NbMenuModule } from '@nebular/theme';

const SOLUTION_COMPONENTS = [
    SolutionComponent,
];
@NgModule({
    imports: [
        SolutionRoutingModule,
        ThemeModule,
        NbMenuModule,
        //NbCardModule
    ],
    declarations: [
        SolutionComponent,
    ],
    providers: [
        DataService
    ],
    entryComponents: [
        
    ],
    bootstrap: [SolutionComponent]
})
export class SolutionModule {
}