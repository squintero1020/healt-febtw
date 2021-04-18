import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private LocalStorage : LocalService
  ) { }


  getByCompany(companyid, nit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/GetByCompany?companyid=${companyid}&nit=${nit}`;
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

  getByID(id,companyid,nit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/GetByID?id=${id}&companyid=${companyid}&nit=${nit}`;
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

   Add(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/Add`;
      this.http
        .post<any[]>(apiURL,JSON.stringify(item), { headers: headers })
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

  Update(item) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
  });
  const promise = new Promise((resolve, reject) => {
    const apiURL = `api/Usuario/Update`;
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

  delete(id,companyid,nit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/Delete?id=${id}&companyid=${companyid}&nit=${nit}`;
      this.http
        .delete<any[]>(apiURL, { headers: headers })
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
