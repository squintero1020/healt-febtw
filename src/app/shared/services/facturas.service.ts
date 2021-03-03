import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(
    private http : HttpClient,
  ) { }

 PullInvoiceFromMail(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Facturas/PullInvoiceFromMail?ClienteId=${localStorage.getItem('clienteId')}`;
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

  getByCompany(id) {
    const promise = new Promise((resolve, reject)=> {
      this.http.get<any[]>(`api/Facturas/GetByCompany?ClienteId=${id}&UsuarioId=${localStorage.getItem("usuarioId")}`)
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

  AceptOrReject(facturaId: number, resp: boolean) {
    console.log("paso");
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Facturas/AceptOrReject?FacturaId=${facturaId}&resp=${resp}`;
      this.http
        .post<any[]>(apiURL, { headers: headers })
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
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Facturas/Update?FacturaId=${item.facturaId}`;
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
}


