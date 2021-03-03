import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosService } from "../../../shared/services/usuarios.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { FormBuilder } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: "app-cambiar-contrasena",
  templateUrl: "./cambiar-contrasena.component.html",
  styleUrls: ["./cambiar-contrasena.component.scss"],
})

export class CambiarContrasenaComponent implements OnInit {
  public parametros: any;
  form: FormGroup;
  changePassForm: FormGroup;
  constructor(
    public modalActive: NgbActiveModal,
    public apiUsuariosService: UsuariosService,
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        currPassword: new FormControl("", Validators.required),
        newPassword: new FormControl("", [Validators.required]),
        new2Password: new FormControl("", [Validators.required]),
      },
      {
        validator: this.passwordMatchValidator("newPassword", "new2Password"),
      }
    );

    this.changePassForm = this.formBuilder.group(
      {
        clienteId: new FormControl(Number(localStorage.getItem("clienteId")), Validators.required),
        usuarioId: new FormControl(Number(localStorage.getItem("usuarioId")), Validators.required),
        oldPassword: new FormControl("", Validators.required),
        newPassword: new FormControl("", Validators.required)
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  closeViewModal() {
    this.modalActive.dismiss(0);
  }
  saveModal() {
    console.log(this.form);

    this.handSuccessFullSave(this.form);
    // this.passwordMatchValidator()
    let newPass = this.form.value.newPassword;
    let new2Pass = this.form.value.new2Password;
    let oldPass = this.form.value.currPassword;
    var resp: any

    this.changePassForm.controls['oldPassword'].patchValue(this.form.value.currPassword)
    this.changePassForm.controls['newPassword'].patchValue(this.form.value.newPassword)

    this.apiUsuariosService
      .ChangePass(this.changePassForm.value)
      .then((res: any) => {
        console.log(res);
        if(res.success){
          Swal.fire(
            'Bien hecho',
            res.message + ' Por favor inicia sesión de nuevo',
            'success'
          )
          this.auth.logOut();
        }else{
          Swal.fire(
            'Error',
            'Hubo un error al guardar: '+res.message,
            'error'
          )
          this.auth.logOut();
        }
      })
      .catch(console.error);
  }

  handSuccessFullSave(form) {
    this.modalActive.dismiss({ form });
  }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}