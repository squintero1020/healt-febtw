import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfCorrClientesService {
  readonly apiUrl = environment.baseURL_GDOCService;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization",
    }),
  };

  constructor(private http: HttpClient) { }


  getByCompany() {
    const promise = new Promise((resolve, rejects) => {
      this.http
        .get<any[]>(this.apiUrl + `ConfCorreoClientes/GetConfCorreoClientes?ConfCorreoClienteId=${localStorage.getItem("clienteId")}`)
        .toPromise()
        .then(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            rejects(err);
          }
        );
    });
    return promise;
  }

  Add(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/ConfCorreoClientes/Add`;
      this.http
        .post<any[]>(apiURL, JSON.stringify(item), { headers: headers })
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

  Update(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/ConfCorreoClientes/Update?ConfCorreoClienteId=${localStorage.getItem(
        "clienteId"
      )}`;
      this.http
        .put<any[]>(apiURL, JSON.stringify(item), { headers: headers })
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
