import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

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
      this.http.get<any[]>(this.apiUrl+`Grupos/GetByCompany?ClienteId=${id}`)
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

  Add(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Grupos/Add?ClienteId=${localStorage.getItem("clienteId")}`;
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
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Grupos/Update?ClienteId=${localStorage.getItem("clienteId")}`;
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

  getUsuariosByCompany(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/GetByCompany?ClienteId=${localStorage.getItem("clienteId")}`;
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

    getByID(id){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
      });
      const promise = new Promise((resolve, reject) => {
        const apiURL = `api/Grupos/GetByID?ClienteId=${localStorage.getItem("clienteId")}&GrupoId=${id}`;
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
      return promise;
    }

    Deactivate(id) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
      });
      const promise = new Promise((resolve, reject) => {
        const apiURL = `api/Grupos/Deactivate?ClienteId=${localStorage.getItem(
          "clienteId"
        )}&GrupoId=${id}`;
        this.http
          .get<any[]>(apiURL)
          .toPromise()
          .then(
            (res: any) => {
              // Success
              resolve(res);
            },
            (err) => {
              // Error
              reject(err);
            }
          );
      });
      return promise;
    }
}
