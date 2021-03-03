import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlujosService {

  readonly apiUrl = environment.baseURL_GDOCService;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getByCompany(id) {
    const promise = new Promise((resolve, reject)=> {
      this.http.get<any[]>(this.apiUrl+`EncabezadosFlujo/GetEncabezadosFlujo?ClienteId=${id}`)
      .toPromise()
      .then((res: any)=>{
        //Success
        resolve(res);
      },
        err=>{
          reject(err);
        }
      );
    });
    return promise;
  }

  getByID(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL1 = this.apiUrl + `EncabezadosFlujo/GetByID?ClienteId=${localStorage.getItem("clienteId")}&EncabezadoFlujoId=${id}`;
      this.http
        .get<any[]>(apiURL1)
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

  Add(item){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `/api/EncabezadosFlujo/Add?ClienteId=${localStorage.getItem("clienteId")}`;
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

  Update(item){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/EncabezadosFlujo/Update?ClienteId=${localStorage.getItem("clienteId")}`;
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

  Deactivate(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL1 = this.apiUrl + `EncabezadosFlujo/Deactivate?ClienteId=${localStorage.getItem("clienteId")}&EncabezadoFlujoId=${id}`;
      console.log(apiURL1);
      
      this.http
        .get<any[]>(apiURL1)
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
