import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaarService {

  constructor(
    private http: HttpClient,
    private LocalStorage : LocalService
  ) { }

  getByCompany(filterar) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/FacturaAR/GetByCompany`;
      this.http
        .post<any[]>(apiURL,JSON.stringify(filterar), { headers: headers })
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  getByID(filterar) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/FacturaAR/GetByID`;
      this.http
        .post<any[]>(apiURL,JSON.stringify(filterar), { headers: headers })
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }
}
