import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsecutivosService } from '../../../shared/services/consecutivos.service';
import { GruposService } from '../../../shared/services/grupos.service';
import { AccionesService } from '../../../shared/services/acciones.service';
import { DisparadoresService } from '../../../shared/services/disparadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlujosService } from '../../../shared/services/flujos.service';
import Swal from 'sweetalert2';
import {IOption} from 'ng-select';

@Component({
  selector: 'app-formulario-flujos',
  templateUrl: './formulario-flujos.component.html',
  styleUrls: ['./formulario-flujos.component.scss']
})
export class FormularioFlujosComponent implements OnInit {

  disparadoresOptions: Array<IOption> = [];
  
  FormFlujos: FormGroup;
  DetallesFlujo: FormArray;
  consect:any=0;
  clienteId: any = localStorage.getItem('clienteId')
  grupo$: any[];
  accione$: any[];
  disparadore$: any[];
  disparadoresSelected: number;
  edit: boolean = false;
  disparadoresName: {value: string, label:string, disabled?: boolean} = {value: "",label: "", disabled: false};
  array: any[] = [];


  constructor(private apiConsect : ConsecutivosService,
    private apiGruposService: GruposService,
    private apiAccionesService: AccionesService,
    private apiDisparadoresService: DisparadoresService,
    private _route: ActivatedRoute,
    private flujoService: FlujosService,
    private route: Router) {
   }

  ngOnInit(): void{

    this.loadCombos(this.clienteId);

    const id = this._route.snapshot.params["id"];
    if (!id) {
      this.apiConsect.getConsecutive('Flujos')
      .then((res:any)=>{
        if(res.success){

          this.consect = res.result;
          this.FormFlujos.controls['flujoId'].setValue(this.consect)

        }
      })
      .catch(console.error)
    }

    this.FormFlujos = new  FormGroup({
      encabezadoFlujoId: new FormControl(0),
      clienteId: new FormControl(Number(localStorage.getItem('clienteId'))),
      flujoId : new FormControl(Number()),
      nombre : new FormControl('',Validators.required),
      detallesflujo : new FormArray([new FormGroup({
        idDetalleFlujo : new FormControl(0),
        flujoId : new FormControl(Number(this.consect)),
        clienteId :  new FormControl(Number(localStorage.getItem('clienteId')), Validators.required),
        grupoId : new FormControl(Number(),Validators.required),
        accionId : new FormControl(Number(),Validators.required),
        disparadores : new FormControl(''),
        orden:new FormControl(1)
      })]),
      inactive: new FormControl(false),
      createdAt:new FormControl(new Date),
      modifyDate:new FormControl(new Date),
      modifiedBy: new FormControl(''),
      createdBy: new FormControl(''),
    });

    this.getGrupos(this.clienteId);
    this.getAcciones(this.clienteId);

    this.loadData();
  }

async loadCombos(clienteId){
  let respuesta = await this.getDisparadores(clienteId);
  let dispador=[];
  respuesta.forEach(element => {
    dispador.push({value:element.value,label:element.label})
  });
  this.disparadoresOptions = dispador;

}

 get arrayDetalleFlujo(){
   return this.FormFlujos.get('detallesflujo') as FormArray;
 }
 get f(){
  return this.FormFlujos.controls;
}

  addLine(){
    let orden=0;
    this.arrayDetalleFlujo.controls.forEach(a=>{
      if(orden < a['controls']['orden'].value)
        orden = a['controls']['orden'].value;
    });
    this.arrayDetalleFlujo.push(new FormGroup({
      idDetalleFlujo : new FormControl(0),
      flujoId : new FormControl(Number(this.consect)),
      clienteId :  new FormControl(Number(localStorage.getItem('clienteId'))),
      grupoId : new FormControl(Number(),Validators.required),
      accionId : new FormControl(Number(),Validators.required),
      disparadores : new FormControl(''),
      orden:new FormControl(Number(orden+1)),
    }));
  }

  loadData() {
    const id = this._route.snapshot.params["id"];
    if (id && id != "") {
      this.flujoService
        .getByID(id)
        .then((res: any) => {
          if (res.success) {
            this.edit = true;
            this.FormFlujos.patchValue(res.result);
            if(res.result.detallesFlujo != null){
              if(res.result.detallesFlujo.length > 0){
                this.arrayDetalleFlujo.removeAt(0);
                //
                res.result.detallesFlujo.forEach(a => {
                  let disparadores=[];
                  let dispara = a.disparadores.split(',');
                  dispara.forEach(a => {
                    disparadores.push(Number(a));
                  });
                  a.disparadores = disparadores;

                    this.arrayDetalleFlujo.push(new FormGroup({
                      idDetalleFlujo : new FormControl(a.idDetalleFlujo),
                      flujoId : new FormControl(a.flujoId),
                      clienteId :  new FormControl(a.clienteId),
                      grupoId : new FormControl(a.grupoId,Validators.required),
                      accionId : new FormControl(a.accionId,Validators.required),
                      disparadores : new FormControl(a.disparadores),
                      orden:new FormControl(a.orden)
                    }));
                });
              }
            }
          }
        })
        .catch(console.error);
    }
  }

  getGrupos(clienteId){
    this.apiGruposService
    .getByCompany(clienteId)
    .then((res: any) => {
      this.grupo$ = res.result;
    })
    .catch(console.log);
  }

  getAcciones(clienteId){
    this.apiAccionesService
    .getByCompany(clienteId)
    .then((res:any)=>{
      this.accione$ = res.result;;
    })
    .catch(console.log);
  }


  async getDisparadores(clienteId){
    var disparadores = [];
    await this.apiDisparadoresService
    .getByCompany()
    .then((res:any)=>{
      if(res.success){
        res.result.forEach(a => {
          disparadores.push({value:a.disparadorId,label:a.nombre,disabled:false})
        });
      }     
    })
    .catch(console.log);
    return disparadores;

  }

  deleteRow(i){

    this.arrayDetalleFlujo.removeAt(i)
  }

  clicInput(i){}

  onSubmit(){

    try {

      this.FormFlujos.enable();
      let i=0;
      this.FormFlujos.controls.detallesflujo.value.forEach(element => {
        let disparadores = '';
        if(element.disparadores){
          element.disparadores.forEach(a => {
              disparadores += a + ',';
          });
        }
        this.FormFlujos.value.detallesflujo[i].disparadores = disparadores.substring(0,disparadores.length-1);
        this.FormFlujos.value.detallesflujo[i].flujoId = this.FormFlujos.controls['flujoId'].value
        this.FormFlujos.value.detallesflujo[i].grupoId = Number( this.FormFlujos.value.detallesflujo[i].grupoId);
        this.FormFlujos.value.detallesflujo[i].accionId = Number( this.FormFlujos.value.detallesflujo[i].accionId);
        i++;
      });

      if (!this.edit) {
        // return;

        this.flujoService
          .Add(this.FormFlujos.value)
          .then((res: any) => {
            if (res.success) {
              Swal.fire(
                'Bien hecho',
                'los datos han sido guardados con éxito',
                'success'
              )
              this.route.navigateByUrl("flujos");
            } else {
              Swal.fire(
                'Error',
                'Revisa los datos al guardar',
                'error'
              )
            }
          })
          .catch(console.error);

      } else {
        this.flujoService
          .Update(this.FormFlujos.value)
          .then((res: any) => {
            if (res.success) {
              Swal.fire(
                'Bien hecho',
                'los datos han sido actualizados con éxito',
                'success'
              )
              this.route.navigateByUrl("flujos");
            } else {
              Swal.fire(
                'Error',
                'Revisa los datos al actualizar',
                'error'
              )
            }
          })
          .catch(console.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
