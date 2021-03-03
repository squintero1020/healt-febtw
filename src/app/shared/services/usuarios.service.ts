import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  //OBTENER LINEAS DE FACTURA
  getByCompany() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/GetByCompany?ClienteId=${localStorage.getItem("clienteId")}`;
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

    //OBTENER LINEAS DE FACTURA
    getByID(id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
      });
      const promise = new Promise((resolve, reject) => {
        const apiURL = `api/Usuarios/GetByID?ClienteId=${localStorage.getItem("clienteId")}&UsuarioId=${id}`;
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

   //GUARDAR USUARIO
   Add(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/Add?ClienteId=${localStorage.getItem("clienteId")}`;
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

   //GUARDAR USUARIO
   Update(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/Update?ClienteId=${localStorage.getItem("clienteId")}`;
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

  getRoles() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Roles/GetRoles`;
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

  ChangePass(item) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Usuarios/ChangePass`;
      this.http
        .put<any[]>(apiURL, JSON.stringify(item), { headers: headers })
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
