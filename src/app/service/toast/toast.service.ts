import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr : ToastrService) { }

  showToaster(status : string, message : string){
    const config = {
      positionClass: 'toast-bottom-left'
    }
    switch(status){
      case 'success':
        this.toastr.success(message, '',config)
        break;
      case 'error':
        this.toastr.error(message,'', config)
        break;
      case 'warning':
        this.toastr.warning(message,'', config)
        break;
      case 'info':
        this.toastr.info(message,'', config)
        break;
    }

  }
}
export enum ToastType{
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}
