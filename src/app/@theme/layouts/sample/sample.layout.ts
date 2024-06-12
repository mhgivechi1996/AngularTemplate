import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay, takeWhile, withLatestFrom } from 'rxjs/operators';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  templateUrl: './sample.layout.html',
})
export class SampleLayoutComponent implements OnInit {
  subtractDateOfDays : string ;
  subtractDateOfDaysColor : string = "#63c7c7" ;
  notificationCount: number = 8;
  valuess = null;



 
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;
  ncWidth: any;
  showSystemInfo: boolean = false;

  constructor(
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    }

    

  

  

  async ngOnInit() {
    
  }

  
}
