import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient,
    private LocalStorage : LocalService
  ) { }

  //OBTENER LINEAS DE FACTURA
  getByUsuarioID() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStorage.getJsonValue('token')}`
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Menu/GetByUsuarioID?usuarioid=${this.LocalStorage.getJsonValue('usuarioid')}`;
      this.http
        .post<any[]>(apiURL, { headers: headers })
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
