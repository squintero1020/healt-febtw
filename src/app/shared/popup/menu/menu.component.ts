import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarComentariosFacturaComponent } from 'src/app/components/modales/agregar-comentarios-factura/agregar-comentarios-factura.component';
import Swal from 'sweetalert2';
import { Factura } from '../../models/factura';
import { FacturasFlujoService } from '../../services/facturas-flujo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CambiarFlujoComponent } from 'src/app/components/modales/cambiar-flujo/cambiar-flujo.component';
import { FacturasService } from '../../services/facturas.service';
import { DisparadoresService } from '../../services/disparadores.service';
import { EpicorService } from '../../services/epicor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loading: boolean = false;

  public parent: string = '';
  public factura:any;

  titulo1: string = 'Factura N° ';

  option1: boolean = true;
  option2: boolean = true;
  option3: boolean = true;
  option4: boolean = true;
  option5: boolean = true;
  option6: boolean = true;
  option7: boolean = true;
  option8: boolean = true;
  option9: boolean = true;

  noshow1: boolean = true;
  noshow2: boolean = true;
  noshow3: boolean = true;
  noshow4: boolean = true;
  noshow5: boolean = true;
  noshow6: boolean = true;
  noshow7: boolean = true;
  noshow8: boolean = true;
  noshow9: boolean = true;
  factura$: Factura[] = [];


  constructor(
    private modalActive: NgbActiveModal,
    private apiFacturasFlujoService: FacturasFlujoService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private apiFacturaService: FacturasService,
    private apiDisparadoresService: DisparadoresService,
    private apiEpicorServce: EpicorService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    console.log(this.factura,"menu");
    this.titulo1 += this.factura.nFactura;

    if (this.parent === 'CCDOC') {
      this.option1 = false;
      this.option2 = false;
      this.option3 = false;
      this.option4 = false;
      this.option5 = false;
      this.option6 = false;
      this.option7 = false;
      this.option8 = false;
      this.option9 = false;
    }
  }

  onClickCloseModal(){
    this.modalActive.dismiss(0);
  }

  onClickOption1CCDOC(){
    console.log(this.factura);
    this.spinner.show()
    if(this.factura.facturasFlujo.length){
      this.factura.facturasFlujo[0].comentarios = this.factura.comentarios;
      this.factura.facturasFlujo[0].usuarioId = Number(localStorage.getItem("usuarioId"))
      console.log(this.factura.facturasFlujo[0]);
      var facturaFlujo = this.factura.facturasFlujo[0];
      this.loading = true;
      this.apiFacturasFlujoService.changeStatus(facturaFlujo, 2).then((res: any)=>{
        if(res.success){
          console.log("Acepta");
          this.handSuccessfullSave(true,'ACPT',res);
        }else{
          this.handSuccessfullSave(false,'ACPT',res);
        }
        this.loading =false;
      }).catch((err:any)=>{
        console.log(err);
        this.loading =false;
      });
    }
  }

  onClickOption2CCDOC(){
    
    if(this.factura.facturasFlujo){
      this.factura.facturasFlujo[0].comentarios = this.factura.comentarios;
      this.factura.facturasFlujo[0].usuarioId = Number(localStorage.getItem("usuarioId"))
      var facturaFlujo = this.factura.facturasFlujo[0];
      this.loading=true;
      this.apiFacturasFlujoService.changeStatus(facturaFlujo, 3).then((res: any)=>{
        if(res.success){
          this.handSuccessfullSave(true,'REJ',res);
        }else{
          this.handSuccessfullSave(false,'REJ',res);
        }
        this.loading=false;
      }).catch((err:any)=>{
        console.log(err);
        this.loading =false;
      });
    }
  }

  onClickOption3CCDOC(){
        var modal = this.modal.open(AgregarComentariosFacturaComponent, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });

    modal.result.then(this.handleModalComent.bind(this));
    modal.componentInstance.data = this.factura;
    modal.componentInstance.id = this.factura.facturaId;
  }

  onClickOption4CCDOC(){
    var modal = this.modal.open(CambiarFlujoComponent, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });

    modal.result.then(this.handleModalCambioFlujo.bind(this));
    modal.componentInstance.data = this.factura;
    modal.componentInstance.id = this.factura.facturaId;
  }

  handleModalComent(response) {
    if (response.form) {
      let sucess:boolean =true;
      let process:string='Coment';
      let result:any=response;
      this.handSuccessfullSave(sucess,process,result);
    }
  }

  handleModalCambioFlujo(response) {
    if (response.form) {
      let sucess:boolean =true;
      let process:string='ChangeFlow';
      let result:any=response;
      this.handSuccessfullSave(sucess,process,result);
    }
  }

  onClickOption5CCDOC(){
    
    this.factura.encabezadoFlujoId = 0;
    this.loading =true;
    this.apiFacturaService
    .Update(this.factura)
    .then((res: any) => {
      let sucess:boolean =true;
      let process:string='Escalar';
      let result:any=res;
      this.loading =false;
      this.handSuccessfullSave(sucess,process,result);
    })
    .catch((err:any)=>{
      console.log(err);
      this.loading=false;
    });    
  }
  onClickOption6CCDOC(){

  }
  onClickOption7CCDOC(){
    this.loading =true;
    this.apiDisparadoresService
    .CompareOrderWithInvoice(this.factura.facturaId, this.factura.nOrdenCompra)
    .then((res: any) => {
      if(res.success){
        Swal.fire(
          'Bien hecho!',
          'Se envió correo para comprar',
          'success'
        )       
      }
      this.loading =false;
      window.location.reload()
    })
    .catch((err:any)=>{
      console.log(err);
      this.loading=false;
    });  
  }
  onClickOption8CCDOC(){
    
    const otro = {
      company: "ALICO",
      order: this.factura.nOrdenCompra? this.factura.nOrdenCompra:"0",
      nitproveedor: this.factura.fiscalIdProveedor,
      factura: this.factura.nFactura,
      fechafac: this.factura.fechaFactura,
      archivoadjunto: 'https://gdoc.amazonaserp.com/documents/'+this.factura.facturaId,
      totalfac:this.factura.total.toString(),
    };
    this.loading =true;
    this.apiEpicorServce
    .createAp(otro)
    .then((res: any)=>{
      if(!res.success)
        Swal.fire('Notifcación',res.message,'warning');
        else{
          Swal.fire('Notifcación',res.message,'success');
          this.modalActive.dismiss(0);
        }
      this.loading=false;
    })
    .catch((err:any)=>{
      console.log(err);
      this.loading=false;
    })
  }
  
  onClickOption9CCDOC(){
    //PRIMER PARAMETRO BOOL : RESPUESTA DEL SERVICIO
    //SEGUNDO PARAMETRO STRING : IDENTIFICAR EL PROCESO
    //TERCER PARAMETRO ANY: OBJETO DE RESPUESTA
    // let sucess:boolean =true;
    // let process:string='Crear Adjunto';
    // let result:any=[];
    // this.handSuccessfullSave(sucess,process,result);


    const obj = {
      company: "ALICO",
      order: this.factura.nOrdenCompra? this.factura.nOrdenCompra:"0",
      nitProveedor: this.factura.fiscalIdProveedor.toString(),
      archivoadjunto: 'https://gdoc.amazonaserp.com/documents/'+this.factura.facturaId,
    };
    console.log(obj);
    this.loading=true;
    this.apiEpicorServce
    .POCheckBeforeUpdate(obj)
    .then((res: any)=>{
      console.log(res);
      if(!res.success)
        Swal.fire('Notifcación',res.message,'warning');
      else{
        Swal.fire('Notifcación',res.message,'success');
        this.modalActive.dismiss(0);
      }
      this.loading=false;
      
    })
    .catch((err:any)=>{
      console.log(err);
      this.loading=false;
    })
  }

  onClickOption10CCDOC(){
    this.router.navigateByUrl(`documents/${this.factura.facturaId}`);
  }

  //RESPUESTA DE LA ACCION
  handSuccessfullSave(success: boolean, process: string, result: any) {
    this.modalActive.dismiss({ success, process, result });
  }

}
