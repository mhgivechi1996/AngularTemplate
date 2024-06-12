import { Injectable } from '@angular/core';
import swal, {SweetAlertResult} from 'sweetalert2';
import {observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  toast: any;

  constructor() {
     this.toast = swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000
    });
  }

  success(message: string) {
    this.toast({
      type: 'success',
      title: message
    });
  }

  error(message: string) {
    this.toast({
      type: 'error',
      title: message
    });
  }

  warning(message: string) {
    this.toast({
      type: 'warning',
      title: message
    });
  }

  message(message: string) {
    this.toast({
      type: 'info',
      title: message
    });
  }
 


}
