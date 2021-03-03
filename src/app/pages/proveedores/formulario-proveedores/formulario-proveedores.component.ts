import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../../shared/services/proveedores.service';
import { FlujosService } from '../../../shared/services/flujos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-proveedores',
  templateUrl: './formulario-proveedores.component.html',
  styleUrls: ['./formulario-proveedores.component.scss']
})
export class FormularioProveedoresComponent implements OnInit {

  addProveedoresForm: FormGroup;
  selected = new FormControl(0);
  edit:boolean=false;
  flujo$: any[];

  constructor(
    private route: Router,
    private apiProveedoresService: ProveedoresService,
    private _route: ActivatedRoute,
    private apiFlujosService: FlujosService
  ) { }

  ngOnInit(): void {
    this.addProveedoresForm = new FormGroup({
      proveedorId: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
      correo: new FormControl('', Validators.required),
      numCuenta: new FormControl(''),
      bancoId: new FormControl(''),
      clienteId: new FormControl(localStorage.getItem('clienteId')),
      fiscalId: new FormControl(''),
      inactive: new FormControl(false),
      createdAt:new FormControl(new Date),
      modifyDate:new FormControl(new Date),
      modifiedBy: new FormControl(''),
      createdBy: new FormControl(''),
      flujoId: new FormControl('', Validators.required)
    })

    this.loadFlujos()
    this.loadData();

  }

  get f(){return this.addProveedoresForm.controls;}

  loadData() {
    const id = this._route.snapshot.params["id"];
    if (id && id != "") {
      this.apiProveedoresService
      .getByID(id)
      .then((res: any) => {

        if (res.success) {
          this.edit = true;
            this.addProveedoresForm.patchValue(res.result);
          }
        })
        .catch(console.error);
    }
  }

  loadFlujos(){
    this.apiFlujosService.getByCompany(localStorage.getItem('clienteId'))
    .then((res:any)=>{
      if(res.success){
        this.flujo$=res.result
        this.flujo$.forEach(x => {
          if(x.flujoId === 275){
            this.flujo$.pop()
          }
        });
      }else{
        //
      }
    })
    .catch(console.error);
  }


  onSubmit(){

    try {
      this.addProveedoresForm.enable();
      this.addProveedoresForm.value.nit = String(this.addProveedoresForm.value.nit)
      this.addProveedoresForm.value.telefono = String(this.addProveedoresForm.value.telefono)
      this.addProveedoresForm.value.clienteId = Number(this.addProveedoresForm.value.clienteId)
      this.addProveedoresForm.value.flujoId = Number(this.addProveedoresForm.value.flujoId)
      if(!this.edit){
          this.apiProveedoresService.Add(this.addProveedoresForm.value)
          .then((res:any)=>{
            if(res.success){
              Swal.fire(
                'Bien hecho',
                'los datos han sido guardados con éxito',
                'success'
              )
              this.route.navigateByUrl("proveedores")
            }
            else{
              Swal.fire(
                'Error',
                'Revisa los datos al guardar',
                'error'
              )
            }
          })
          .catch(console.error)
      }else{
        this.apiProveedoresService.Update(this.addProveedoresForm.value)
        .then((res:any)=>{
          if(res.success){
            Swal.fire(
              'Bien hecho',
              'los datos han sido actualizados con éxito',
              'success'
            )
            this.route.navigateByUrl("proveedores")
          }
          else{
            Swal.fire(
              'Error',
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
