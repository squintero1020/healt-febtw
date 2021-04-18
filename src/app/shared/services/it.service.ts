import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ItService {

  constructor(
    private http: HttpClient,
    private LocalStorage : LocalService
  ) { }

  getByID(companyid,nit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/IT/GetByID?companyid=${companyid}&nit=${nit}`;
      this.http
        .get<any[]>(apiURL, { headers: headers })
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

  update(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/IT/Update`;
      this.http
        .put<any[]>(apiURL,JSON.stringify(item), { headers: headers })
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
