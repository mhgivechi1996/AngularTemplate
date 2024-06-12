import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OperationResult } from '../../model/operation-result/operation.result';
import { SwalService } from '../notification/swal.service';
import { SelectItem, SelectOptionModel } from '../../model/select-option/select-option.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from '../../../../environments/environment';

import queryString from 'query-string';

// import {FileUploader} from 'ng2-file-upload';

enum Status {
  success = 1,
  stop = 2,
  error = 3,
}

enum ErrorStatusCode {
  unkownError = 0,
  badRequest = 400,
  unAuthenticated = 401,
  unAuthorized = 403,
  notFoaund = 404,
  internalServerError = 500,
}

@Injectable()

export class DataService {
  @BlockUI() blockUI: NgBlockUI;
  private headers = new HttpHeaders();
  private baseUrl: string;

  constructor(private httpClient: HttpClient,
    private swalService: SwalService,
  ) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    // if (!environment.production) {
    //   this.baseUrl = environment.apiUrlDevelop;
    // }
    // else {
    //   if (window.location.hostname == environment.baseUrlStage) {
    //     this.baseUrl = environment.apiUrlStage;
    //   }
    //   else if (window.location.hostname == environment.baseUrlProd) {
    //     this.baseUrl = environment.apiUrlProd;
    //   }
      
    // }
    console.log(this.baseUrl);
  }

  downloadWithData<T>(url: string, resource: any, message?: string): Observable<T> {
    if (message !== "") {
      this.blockUI.start(message);
    }
    this.setHeader();
    const _url = this.baseUrl + url;
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.post<OperationResult<any>>(_url, JSON.stringify(resource), { headers: this.headers })
        .subscribe(data => {
          const pdfResult = data.value.fileContents;
          const byteCharacters = atob(pdfResult);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new Blob([byteArray], { type: 'application/pdf;base64' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          this.blockUI.stop();
        });
    });
    // return this.httpClient.post<T>(this.baseUrl + url, data ,{ headers: this.headers, responseType: 'text' as 'json'});
  }

  getById<T>(url: string, id: number, isShowMessage: boolean = false): Observable<T> {
    url += '/' + id;
    return this.getAll<T>(url, isShowMessage);
  }

  get<T>(url: string, params: any, isShowMessage: boolean = false): Observable<T> {
    const objectKeys = Object.keys(params) as Array<keyof T>;
    for (const key of objectKeys) {
      if (params[key] === null) {
        params[key] = undefined;
      }
    }
    const query = queryString.stringify(params);
    if (query) {
      url += '?' + query;
    }
    return this.getAll<T>(url, isShowMessage)
  }

  getFile(url: string, params?: any) {
    let _url = this.baseUrl + url;

    const objectKeys = Object.keys(params);
    for (const key of objectKeys) {
      if (params[key] === null) {
        params[key] = undefined;
      }
    }
    const query = queryString.stringify(params);
    _url += '?' + query;
    setTimeout(() => {
      window.open(_url, '_blank')
    }, 100)
      ;
  }


  getByModel<T>(url: string, params: any): Observable<T> {
    let _url: string = this.baseUrl + url;
    const query = queryString.stringify(params);
    if (query) {
      _url += '?' + query;
    }
    return this.httpClient.get<T>(_url);
  }

  getAll<T>(url: string, isShowMessage: boolean = false): Observable<T> {
    const _url = this.baseUrl + url;
console.log(_url);
    this.setHeader();
    if (!isShowMessage) {
      return new Observable<any>((observer) => {
        // observable execution
        this.httpClient.get<OperationResult<T>>(_url, { headers: this.headers })
          .subscribe(data => {
            // data.status =  2;
            if (data.status === Status.stop) {
              this.showMessage(data.message, Status.stop);
              // observer.error()
              // observer.complete()
            } else {
              if (isShowMessage) this.showMessage(data.message, Status.success);
              observer.next(data.value);
              observer.complete();
            }
          }, HttpErrorResponse => {
            this.showUnhandheldError(HttpErrorResponse);
            // console.log(HttpErrorResponse);
          });
      });
    }

    this.blockUI.start('لطفا صبر کنید');
    return new Observable<any>((observer) => {
      this.httpClient.get<OperationResult<T>>(_url, { headers: this.headers })
        .subscribe(data => {
          // data.status =  2;
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
            // observer.error()
            // observer.complete()
          } else {
            //if (isShowMessage) this.showMessage(data.message, Status.success);
            setTimeout(() => {
              this.blockUI.stop();
            }, 1000);
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
          // console.log(HttpErrorResponse);
        });
    });
  }

  // getSelectOption<T>(url: string, textProperty: string = 'text', valueProperty: string = 'value', isShowMessage: boolean = false): Observable<SelectItem[]> {
  //   const _url = this.baseUrl + url;
  //   this.setHeader();
  //   return new Observable<any>((observer) => {
  //     // observable execution
  //     this.httpClient.get<OperationResult<Array<T>>>(_url, {headers: this.headers})
  //       .subscribe(data => {
  //         // data.status =  2;
  //         if (data.status === Status.stop) {
  //           this.showMessage(data.message, Status.stop);
  //           // observer.error()
  //           // observer.complete()
  //         } else {
  //           if (isShowMessage) this.showMessage(data.message, Status.success);
  //           const itemList = [];
  //           data.value.forEach((item) => {
  //             const text = (!!item[textProperty]) ? item[textProperty] : '';
  //             const value = (!!item[valueProperty]) ? item[valueProperty] : '';
  //             itemList.push(new SelectItem(text, value));
  //           });
  //           observer.next(itemList);
  //           observer.complete();
  //         }
  //       }, HttpErrorResponse => {
  //         this.showUnhandheldError(HttpErrorResponse);
  //         // console.log(HttpErrorResponse);
  //       });
  //   });
  // }

  getSelectOption2<T1, T2>(url: string, textProperty: string = 'text', valueProperty: string = 'value', titleProperty: string, extraProperty: any = null, isShowMessage: boolean = false): Observable<SelectOptionModel<T2>[]> {
    const _url = this.baseUrl + url;
    this.setHeader();
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.get<OperationResult<Array<T1>>>(_url, { headers: this.headers })
        .subscribe(data => {
          // data.status =  2;
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
            // observer.error()
            // observer.complete()
          } else {
            if (isShowMessage) this.showMessage(data.message, Status.success);
            const itemList = [];
            data.value.forEach((item) => {
              const text = (!!item[textProperty]) ? item[textProperty] : '';
              const value = (!!item[valueProperty]) ? item[valueProperty] : '';
              const title = (!!item[titleProperty]) ? item[titleProperty] : '';
              const extra = (extraProperty != null && !!item[extraProperty]) ? item[extraProperty] : null;
              itemList.push(new SelectOptionModel<T2>(text, value, title, extra));
            });
            observer.next(itemList);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
          // console.log(HttpErrorResponse);
        });
    });
  }

  post<T>(url: string, resource, isShowMessage: boolean = true,formData? : boolean): Observable<T> {
    const _url = this.baseUrl + url;
    console.log(_url);
    this.setHeader(formData);
    this.blockUI.start('لطفا صبر کنید');
    //this.blockUI.start(this.messages['COMMON.MSG1']);
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.post<OperationResult<T>>(_url, JSON.stringify(resource), { headers: this.headers })
        .subscribe(data => {
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
          } else {
            if (isShowMessage)
              this.showMessage('عملیات با موفقیت انجام شد', Status.success)
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
        });
    });
  }
  postNoUrl<T>(url: string, resource, isShowMessage: boolean = true,formData? : boolean): Observable<T> {
    const _url =  url;
    console.log(_url);
    this.setHeader(formData);
    this.blockUI.start('لطفا صبر کنید');
    //this.blockUI.start(this.messages['COMMON.MSG1']);
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.post<OperationResult<T>>(_url, JSON.stringify(resource), { headers: this.headers })
        .subscribe(data => {
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
          } else {
            if (isShowMessage)
              this.showMessage('عملیات با موفقیت انجام شد', Status.success)
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
        });
    });
  }

  postFormData<T>(url: string, resource, isShowMessage: boolean = true, headers: Map<string, string> = null): Observable<T> {
    this.setHeader();

    let tempheaders = new HttpHeaders();
    const culture = localStorage.getItem('culture');
    const token = localStorage.getItem('token');
    if (culture) {
        if (tempheaders.has('ac')) this.headers.delete('ac');
        tempheaders = tempheaders.set('ac', culture);
    }
    if (token) {
        tempheaders = tempheaders.set('Authorization', 'Bearer ' + token);
    }
    if (headers !== null) {
        headers.forEach((value: string, key: string) => {
            tempheaders = tempheaders.set(key, value);
        });
    }

    const _url = this.baseUrl + url;
     this.blockUI.start("شکیبا باشید");
    //this.blockUI.start(this.messages['COMMON.MSG1']);
    return new Observable<any>((observer) => {
        // observable execution
        this.httpClient.post<OperationResult<T>>(_url, resource, { headers: tempheaders })
            .subscribe(data => {
                if (data.status === Status.stop) {
                    this.showMessage(data.message, Status.stop);
                } else {
                    if (isShowMessage)
                        this.showMessage("", Status.success);
                    else
                        this.blockUI.stop();
                    observer.next(data.value);
                    observer.complete();
                }
            }, HttpErrorResponse => {
                this.showUnhandheldError(HttpErrorResponse);
            });
    });
}


  put<T>(url: string, resource, isShowMessage: boolean = true): Observable<T> {
    const _url = this.baseUrl + url;
    this.setHeader();
    this.blockUI.start('لطفا صبر کنید');
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.put<any>(_url, JSON.stringify(resource), { headers: this.headers })
        .subscribe(data => {
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
          } else {
            if (isShowMessage)
              this.showMessage('عملیات با موفقیت انجام شد', Status.success)
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
        });
    });
  }

  patch<T>(url: string, resource, isShowMessage: boolean = true): Observable<T> {
    const _url = this.baseUrl + url;
    this.setHeader();
    this.blockUI.start('لطفا صبر کنید');
    return new Observable<any>((observer) => {
      // observable execution
      this.httpClient.patch<any>(_url, JSON.stringify(resource), { headers: this.headers })
        .subscribe(data => {
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
          } else {
            this.showMessage('عملیات با موفقیت انجام شد', Status.success)
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
        });
    });
  }

  delete<T>(url: string, isShowMessage: boolean = true): Observable<T> {
    const _url = this.baseUrl + url;
    this.blockUI.start('لطفا صبر کنید');
    return new Observable<any>((observer) => {
      this.httpClient.delete<OperationResult<T>>(_url, { headers: this.headers })
        .subscribe(data => {
          if (data.status === Status.stop) {
            this.showMessage(data.message, Status.stop);
          } else {
            if (isShowMessage)
              this.showMessage('عملیات با موفقیت انجام شد', Status.success)
            observer.next(data.value);
            observer.complete();
          }
        }, HttpErrorResponse => {
          this.showUnhandheldError(HttpErrorResponse);
        });
    });
  }

  showMessage(message, type) {
    setTimeout(() => {
      this.blockUI.stop();
      switch (type) {
        case Status.error:
          this.swalService.error(message);
          break;
        case Status.stop:
          this.swalService.error(message);
          break;
        case Status.success:
          this.swalService.success(message);
          break;
      }
    }, 1000);
  }

  showUnhandheldError(HttpErrorResponse) {
    setTimeout(() => {
      this.blockUI.stop();
      switch (HttpErrorResponse.status) {
        case ErrorStatusCode.unkownError:
          this.swalService.error('خطایی در سیتسم رخ داده است');
          break;
        case ErrorStatusCode.badRequest:
          this.swalService.error('خطای درخواست نامعتبر در سیستم رخ داده است');
          break;
        case ErrorStatusCode.unAuthenticated:
          this.swalService.error('خطای احراز هویت در سیستم رخ داده است');
          localStorage.clear();
          window.location.href = '';
          break;
        case ErrorStatusCode.unAuthorized:
          this.swalService.error('خطای دسترسی! به این بخش از سیستم دسترسی ندارید. ');
          break;
        case ErrorStatusCode.notFoaund:
          this.swalService.error('خطای پیدا نشدن مسیر رخ داده است');
          break;
        case ErrorStatusCode.internalServerError:
          this.swalService.error(HttpErrorResponse.error.message);
          break;
        default:
          //this.translate.get('COMMON.MSG8').subscribe(msg =>  this.swalService.error(msg));
          this.swalService.error('خطای  ناشناخته در سیتسم رخ داده است');
          break;
      }
    }, 1000);
    // console.log(status);

  }

  private setHeader(formData?) {
    const culture = localStorage.getItem('culture');
    const token = localStorage.getItem('token');
    if (culture) {
      if (this.headers.has('ac')) this.headers.delete('ac')
      this.headers = this.headers.set('ac', culture);
    }
    if (token) {
      if (this.headers.has('Authorization')) this.headers.delete('Authorization')
      this.headers = this.headers.set('Authorization', 'Bearer ' + token);
    }
    if(formData){
      //this.headers.append('Content-Disposition', 'multipart/form-data')
      this.headers = this.headers.set('Content-Disposition', 'multipart/form-data');
      console.log(this.headers)
    }
  }
}

