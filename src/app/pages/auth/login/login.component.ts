import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CambiarContrasenaComponent } from '../../../components/modales/cambiar-contrasena/cambiar-contrasena.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from 'src/app/shared/services/menu.service';
import { LocalService } from 'src/app/shared/services/local.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public navigation:any;
  loading: boolean =false;
  titleEnvironment:string='';
  updates=false;

  loginForm: FormGroup;
  submitted: boolean = false;
  cliente$: any;
  sinllenar: boolean;
  changePass: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private modal : NgbModal,
    private apiMenuService : MenuService, 
    private LocalStorage : LocalService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(){
   
    if(this.auth.estaAutenticado()){
      this.router.navigateByUrl('/app')
    }

    this.loginForm = this.formBuilder.group({
      userid:['1020414845', Validators.required],
      password:['14CC141F7412107911C9', Validators.required],
    });
  }

  get f(){
    return this.loginForm.controls;
  }


  delay(ms: number) {
    window.location.reload();
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  submit(){
    this.loading = true;
    this.auth.logIn(this.loginForm.value).subscribe(
      (resp: any)=>{

        this.loading = false
        if(!resp.success){
          Swal.fire('Notificación',resp.message,'warning');
          return;
        }
        this.loading = true;
        this.apiMenuService.getByUsuarioID()
        .then((resp:any)=>{
          this.loading=false;
          if(resp.success){
            this.navigation = resp.result;
            this.LocalStorage.setJsonValue('navigation',JSON.stringify(this.navigation));
            this.router.navigateByUrl('/app')
          }
        })
        .catch(console.error)
      },(err)=>{
        this.loading = false
        if(err)
        Swal.fire(
          'Error!',
          'Datos incorrectos, por favor validar la información!',
          'error'
        )
        console.log(err);
      }
    )
  }

  openModalChangePassword(){
    var modal = this.modal.open(CambiarContrasenaComponent,{
      ariaLabelledBy:'modal-basic-title',
      size:'lg'
    });

    modal.result.then(
      this.handleModalChangePassword.bind(this),
      this.handleModalChangePassword.bind(this)
    )
    modal.componentInstance.parametros = "";
  }

  handleModalChangePassword(response){
    console.log(response);
  }

  
  leavePassword(event){
    try {
      if(event.keyCode === 13){
        document.getElementById("password").focus();
      }
    } catch (error) {
      
    }
  }

  
  enterPassword(event){
    try {
      if(event.keyCode === 13){
        this.submit();
      }
    } catch (error) {
      
    }
  }

}
