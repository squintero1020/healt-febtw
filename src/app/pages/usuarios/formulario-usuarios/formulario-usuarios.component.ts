import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../shared/services/usuarios.service';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.scss']
})
export class FormularioUsuariosComponent implements OnInit {

  addUserForm: FormGroup;
  selected = new FormControl(0);
  roles;

  edit:boolean=false;
  constructor(
    private _route: ActivatedRoute,
    private apiUsuarioService : UsuariosService,
    private route: Router,
    ) { }

  get f(){return this.addUserForm.controls;}

  ngOnInit(): void {
      this.addUserForm = new FormGroup({
        usuarioId: new FormControl(0),
        nombres : new FormControl({value:'',disabled:false},[Validators.required,Validators.maxLength(100)]),
        contrasena: new FormControl('1234'),
        correo : new FormControl('',[Validators.required,Validators.email]),
        telefono : new FormControl(''),
        fechaIngreso: new FormControl(new Date),
        clienteId: new FormControl(Number(localStorage.getItem("clienteId"))),
        rolId: new FormControl(0),
        fiscalId: new FormControl(''),
        inactive: new FormControl(false),
        createdAt: new FormControl(new Date),
        modifyDate: new FormControl(new Date),
        modifiedBy: new FormControl(''),
        createdBy: new FormControl(''),
      });
      this.loadData();
      this.loadRoles();
  }

  loadData(){
    const id = this._route.snapshot.params['id'];
    if(id && id != ''){
      this.apiUsuarioService.getByID(id)
      .then((res:any)=>{
        if(res.success){
            this.edit=true;
            this.addUserForm.patchValue(res.result);
        }
        else{
          //ALERTA y res.message
        }
      })
      .catch(console.error);
    }
  }

  loadRoles(){
    this.apiUsuarioService.getRoles()
    .then((res:any)=>{
      if(res.success){
        this.roles=res.result
      }else{
        //
      }
    })
    .catch(console.error);
  }

  onSubmit(){

    try {
      this.addUserForm.enable();

      this.addUserForm.controls["rolId"].setValue(Number(this.addUserForm.value.rolId));
      if(!this.edit){
          this.apiUsuarioService.Add(this.addUserForm.value)
          .then((res:any)=>{
            if(res.success){

              // Swal.fire({
              //   allowOutsideClick: false,
              //   title: 'Bien hhecho!',
              //   text: 'Guardado exitosamente',
              //   icon: 'success',
              //   preConfirm: () => {
              //     this.route.navigateByUrl(`${'usuarios'}`)
              //   }
              // })
              Swal.fire(
                'Bien hecho',
                'los datos han sido guardados con éxito',
                'success'
              )
              this.route.navigateByUrl("usuarios")
            }
            else{
              Swal.fire(
                'Hubo un error al guardar',
                'Revisa los datos al guardar',
                'error'
              )
            }

          })
          .catch(console.error)
      }else{
        this.apiUsuarioService.Update(this.addUserForm.value)
        .then((res:any)=>{
          if(res.success){
            Swal.fire(
              'Bien hecho',
              'los datos han sido actualizados con éxito',
              'success'
            )
            this.route.navigateByUrl("usuarios")
          }
          else{
            Swal.fire(
              'Hubo un error al actualizar',
              'Revisa los datos al actualizar',
              'error'
            )
          }
        })
        .catch(console.error)
      }
    } catch (error) {
      console.error(error)

    }
  }


}
