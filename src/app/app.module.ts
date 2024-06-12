import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
//import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ThemeModule } from "./@theme/theme.module";
import { CoreModule } from "./@core/core.module";
import { BlockUIModule } from "ng-block-ui";
import { DataService } from "./@solution/services/common/data.service";


@NgModule({
    declarations: [AppComponent],
    imports: [
        
        CommonModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        //NgbModule,
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        BlockUIModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DataService
    ]
})
export class AppModule {

}
