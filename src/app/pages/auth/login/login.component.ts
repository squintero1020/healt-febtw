import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CambiarContrasenaComponent } from '../../../components/modales/cambiar-contrasena/cambiar-contrasena.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRServiceService } from 'src/app/shared/services/signal-rservice.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  titleEnvironment:string='';
  updates=false;

  loginForm: FormGroup;
  submitted: boolean = false;
  cliente$: any;
  sinllenar: boolean;
  loading: boolean =false;
  changePass: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private modal : NgbModal,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(){
   
    if(this.auth.estaAutenticado()){
      this.router.navigateByUrl('/ccdoc')
    }

    this.loginForm = this.formBuilder.group({
      Correo:['', Validators.required],
      Contrasena:['', Validators.required],
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
    this.spinner.show();
    this.loading = true;
    this.loginForm.value.ClienteId = parseInt( this.loginForm.value.ClienteId)
    this.submitted = true;
    if(this.loginForm.status === "INVALID"){
      this.sinllenar = true
      this.spinner.hide();
      return
    }
    this.auth.logIn(this.loginForm.value).subscribe(
      (resp: any)=>{
        this.spinner.hide();
        this.loading = false
        console.log(resp);
        if(resp.initialized){
          console.log('openModal')
          this.openModalChangePassword()
          return
        }else
        this.delay(2000);
        this.auth.CMD().then((res: any)=>{
          console.log(res.message);
          
        })
        this.router.navigateByUrl('/ccdoc')
        
      },(err)=>{
        this.spinner.hide();
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
