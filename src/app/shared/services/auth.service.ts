import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { UsuarioLoginModel } from '../models/usuario-login';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LocalService } from './local.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseURL;
  userToken: string = '';
  code: any;
  token: any;

  constructor(
    private LocalStorage: LocalService,
    private http: HttpClient,
    public router: Router) {
    this.leerToken()
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
  }

  logIn(usuario: UsuarioLoginModel) {


    const authData = {
      ...usuario
    };

    return this.http.post(
      `${this.url}Login/Login`, authData
    ).pipe(
      map(resp => {
        this.token = resp;
        this.guardarToken(resp);
        return resp;
      })
    )
  }

  private guardarToken(response) {
    if (!response.success)
      return;
    localStorage.clear();
    sessionStorage.clear();
    this.LocalStorage.setJsonValue('usuario', response.result[0][1]);
    this.LocalStorage.setJsonValue('empresa', response.result[1][1]);
    this.LocalStorage.setJsonValue('token', response.result[2][1].access_token);
    this.LocalStorage.setJsonValue('usuarioid', response.result[0][1].UsuarioId);

    let hoy = new Date();
    hoy.setSeconds(3600)
    localStorage.setItem('expira', hoy.getTime().toString());
  }


  leerToken() {
    if (this.LocalStorage.getJsonValue('token')) {
      this.userToken = this.LocalStorage.getJsonValue('token');
    } else {
      this.userToken = '';
    }
    return this.userToken
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.estaAutenticado() !== true) {
      Swal.fire('Error', 'No tienes acceso', 'error');
      this.router.navigate([''])
    }
    return true;
  }
  
  estaAutenticado(): boolean {
    this.leerToken();

    if (this.userToken.length < 20 || localStorage.getItem("initialized") === 'true') {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false
    }

  }
}
