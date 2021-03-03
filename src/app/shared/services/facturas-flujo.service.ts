import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasFlujoService {

  readonly apiUrl = environment.baseURL_GDOCService;

  constructor(private http: HttpClient) { }

  changeStatus(item, estadoId){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL1 = this.apiUrl + `FacturasFlujo/ChangeStatus?EstadoId=${estadoId}`;
      this.http
        .put<any[]>(apiURL1,JSON.stringify(item), {headers: headers})
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

  changeStatusByEmail(item){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL1 = this.apiUrl + `FacturasFlujo/ChangeStatusByEmail?info=${item}`;
      this.http
        .put<any[]>(apiURL1,JSON.stringify(item), {headers: headers})
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
