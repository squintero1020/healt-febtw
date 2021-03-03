import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisparadoresService {

  readonly apiUrl = environment.baseURL_GDOCService;

  constructor(
    private http: HttpClient
  ) { }

  getByCompany() {
    const promise = new Promise((resolve, reject)=> {
      this.http.get<any[]>(this.apiUrl+`Disparadores/GetDisparadores?ClienteId=${localStorage.getItem("clienteId")}`)
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

 CompareOrderWithInvoice(facturaId, PoNum) {
    const promise = new Promise((resolve, reject)=> {
      this.http.get<any[]>(this.apiUrl+`Disparadores/CompareOrderWithInvoice?ClienteId=${localStorage.getItem("clienteId")}&UsuarioId=${localStorage.getItem("usuarioId")}&FacturaId=${facturaId}&PONum=${PoNum}`)
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
