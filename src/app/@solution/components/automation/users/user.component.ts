import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './user-form/user-form.component';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'ngx-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
  })
  export class UserComponent implements OnInit {
    constructor(private modalService: NgbModal
      //,private dialogService: NbDialogService
      ) { }
    ngOnInit() 
    {
      //this.onEdit(1)
      //this.open()
    }
    onEdit(id: number) {
        const activeModal = this.modalService.open(UserFormComponent, {
          size: 'lg',
          container: 'nb-layout',
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-xl'
        });
        activeModal.componentInstance.Id = id;
        
      }
    // open() {
    //   this.dialogService.open(UserFormComponent, {
        
    //   });
    // }

  }