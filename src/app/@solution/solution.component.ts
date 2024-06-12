import { Component } from "@angular/core";
import { MENU_ITEMS } from './pages-menu';
@Component({
    selector: 'ngx-solution',
    template: `<ngx-one-column-layout>
    <nb-menu [autoCollapse]="false" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>`,
})

export class SolutionComponent {
    menu = MENU_ITEMS;
}