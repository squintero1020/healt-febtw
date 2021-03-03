import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { rejects } from "assert";

@Injectable({
  providedIn: "root",
})
export class AccionesService {
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

  constructor(private http: HttpClient) {}

  getByCompany(id) {
    const promise = new Promise((resolve, rejects) => {
      this.http
        .get<any[]>(this.apiUrl + `Acciones/GetByCompany?ClienteId=${id}`)
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

  getByID(id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Acciones/GetByID?ClienteId=${localStorage.getItem(
        "clienteId"
      )}&AccionId=${id}`;
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

  Add(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Acciones/Add?ClienteId=${localStorage.getItem(
        "clienteId"
      )}`;
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

  //GUARDAR USUARIO
  Update(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Acciones/Update?ClienteId=${localStorage.getItem(
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

  Deactivate(id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Acciones/Deactivate?ClienteId=${localStorage.getItem(
        "clienteId"
      )}&AccionId=${id}`;
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
