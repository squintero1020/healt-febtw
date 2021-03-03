import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetallesFlujosService {


  constructor(
    private http: HttpClient
  ) { }

  Add(item){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `/api/DetallesFlujos/Add`;
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
}
