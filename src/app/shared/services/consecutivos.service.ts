import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsecutivosService {

  constructor(
    private http: HttpClient
  ) { }

  getConsecutive(Modulo ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Consecutivos/GetConsecutivos?ClienteId=${localStorage.getItem("clienteId")}&Modulo=${Modulo}`;
      this.http
        .get<any[]>(apiURL)
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
    return promise;  }
}
