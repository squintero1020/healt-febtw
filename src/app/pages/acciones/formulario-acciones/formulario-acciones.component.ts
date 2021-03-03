import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccionesService } from '../../../shared/services/acciones.service';

@Component({
  selector: 'app-formulario-acciones',
  templateUrl: './formulario-acciones.component.html',
  styleUrls: ['./formulario-acciones.component.scss']
})
export class FormularioAccionesComponent implements OnInit {

  addAcionesForm: FormGroup;
  selected = new FormControl(0);
  roles;

  edit:boolean=false;
  constructor(
    private _route:ActivatedRoute,
    private apiAccionesService: AccionesService,
    private route: Router
  ) { }

  get f(){return this.addAcionesForm.controls;}


  ngOnInit(): void {
    this.addAcionesForm = new FormGroup({
      accionId: new FormControl(0),
      nombre: new FormControl({value:'',disabled:false},[Validators.required,Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required]),
      clienteId: new FormControl(Number(localStorage.getItem("clienteId"))),
    })
    this.loadData()
  }

  loadData() {
    const id = this._route.snapshot.params["id"];
    if (id && id != "") {
      this.apiAccionesService
        .getByID(id)
        .then((res: any) => {

          if (res.success) {
            this.edit = true;
            this.addAcionesForm.patchValue(res.result);
          }
        })
        .catch(console.error);
    }
  }


  onSubmit(){

    try {
      this.addAcionesForm.enable();

      if(!this.edit){
          this.apiAccionesService.Add(this.addAcionesForm.value)
          .then((res:any)=>{
            if (res.success) {
              Swal.fire(
                'Bien hecho',
                'los datos han sido guardados con éxito',
                'success'
              )
              this.route.navigateByUrl("acciones");
            } else {
              Swal.fire(
                'Hubo un error al guardar',
                'Revisa los datos al guardar',
                'error'
              )
            }
          })
          .catch(console.error)
      }else{
        this.apiAccionesService.Update(this.addAcionesForm.value)
        .then((res:any)=>{
          if(res.success){
            Swal.fire(
              'Bien hecho',
              'los datos han sido actualizados con éxito',
              'success'
            )
            this.route.navigateByUrl("grupos");
          } else {
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
