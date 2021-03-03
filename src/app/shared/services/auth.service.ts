import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { UsuarioLoginModel } from '../models/usuario-login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseURL_identityService;
  userToken: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    })
  };

  code: any;
  token: any;

  constructor(private http: HttpClient,
    public router: Router) {
    this.leerToken()
  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  logIn(usuario: UsuarioLoginModel) {


    const authData = {
      ...usuario
    };

    return this.http.post(
      `${this.url}authenticate`, authData
    ).pipe(
      map(resp => {

        this.token = resp;
        this.guardarToken(resp);
        return resp;
      })
    )
  }

  private guardarToken(idToken) {
    localStorage.clear()
    this.userToken = `Bearer ${idToken.token}`
    localStorage.setItem('usuarioId', idToken.usuarioId)
    localStorage.setItem('token', this.userToken);
    localStorage.setItem('nombres', idToken.nombres)
    localStorage.setItem('clienteId', idToken.clienteId)
    localStorage.setItem('correo', idToken.correo)
    localStorage.setItem('initialized', idToken.initialized)
    localStorage.setItem('rolId', idToken.rolId)

    let hoy = new Date();
    hoy.setSeconds(3600)
    localStorage.setItem('expira', hoy.getTime().toString());
  }


  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else {
        this.userToken = '';
      }
      return this.userToken
  }

  estaAutenticado(): boolean{
    this.leerToken();
    
    if(this.userToken.length < 20 || localStorage.getItem("initialized") === 'true'){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false
    }

  }

  getCompany() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `api/Clientes/GetByID?ClienteId=${localStorage.getItem("clienteId")}`;
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

  imprimeHeader(){
    return   {
      'authorization': this.userToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    }
  }

  CMD(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'bearer ' + sessionStorage.getItem('fgh0x01b4#8')
    });
    const promise = new Promise((resolve, reject) => {
      const apiURL = `/api/CMD/InitialCMD?ClienteId=${localStorage.getItem("clienteId")}`;
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

}
