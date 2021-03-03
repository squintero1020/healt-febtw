import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  
  readonly apiUrl = environment.baseURL_GDOCService;


  constructor(private http: HttpClient) { }


  getDocumentByFacturaId(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL1 = this.apiUrl + `Documentos/GetByOnlyID?FacturaId=${id}`;
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
