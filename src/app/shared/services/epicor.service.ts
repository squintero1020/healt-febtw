import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EpicorService {

  constructor(
    private http: HttpClient
  ) { }

  createAp(item){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `/api/Epicor/CreteAP`;
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


  POCheckBeforeUpdate(obj) {
    const promise = new Promise((resolve, reject)=> {
      this.http.get<any[]>(`/api/Epicor/POCheckBeforeUpdate?company=${obj.company}&order=${obj.order}&nitproveedor=${obj.nitProveedor}&archivoadjunto=${obj.archivoadjunto}`)
      .toPromise()
      .then((res: any)=>{
        resolve(res);
      },
        err=>{
          reject(err);
        }
      );
    });
    return promise;
  }
}
