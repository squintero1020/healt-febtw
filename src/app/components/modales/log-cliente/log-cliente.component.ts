import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturaarService } from 'src/app/shared/services/facturaar.service';
import { LocalService } from 'src/app/shared/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-cliente',
  templateUrl: './log-cliente.component.html',
  styleUrls: ['./log-cliente.component.scss']
})
export class LogClienteComponent implements OnInit {

  facturasTimbradrasForm: FormGroup;

  loading:boolean=false;

  public InvoiceNum:string='';
  public LegalNumber:string='';
  public InvoiceType : string = '';

  constructor(
    private LocalStorage : LocalService,
    public modalActive:NgbActiveModal,
    private apiFacturaARService : FacturaarService,
    ) { }

  ngOnInit(): void {

    let usuario = this.LocalStorage.getJsonValue('usuario');
    let filtroFactura = {
      CompanyID : usuario.CompanyID,
      NIT : usuario.NIT,
      InvoiceNum : this.InvoiceNum,
      LgalNumber : this.LegalNumber,
      InvoiceType : this.InvoiceType
    }
    this.loading = true;
    this.apiFacturaARService.getByID(filtroFactura)
    .then((res_facturas:any)=>{
      if(res_facturas.success){
        this.facturasTimbradrasForm.patchValue(res_facturas.result);
      }
      else
        Swal.fire('Notificación',res_facturas.message,'warning');
      this.loading = false;
    })
    .catch((err: any) => {
      this.loading = false;
      console.error(err.status);
    });

    this.facturasTimbradrasForm = new FormGroup({
      CompanyID: new FormControl(),
      TipoFactura : new FormControl(),
      NumFactura : new FormControl(),
      LegalNum : new FormControl(),
      Cliente : new FormControl(),
      RazonSocialEMP : new FormControl(),
      FechaFactura : new FormControl(),
      FechaEnvioDian : new FormControl(),
      AceptaDian : new FormControl(),
      AceptaCliente : new FormControl(),
      PathPdfInvoice : new FormControl(),
      xmlErp : new FormControl(),
      LogTransaccion : new FormControl(),
      ObservacionCliente : new FormControl({value:'',disabled:true}),
      ObservacionDian : new FormControl(),
      FechaEnvioCliente : new FormControl(),
      Empresa_EmailFE : new FormControl()
    });

    this.playAudio("success");
  }

  closeInvoiceViewModal(){
    this.saveModal();
  }

  saveModal(){
    this.handSuccessfullSave();
  }

  handSuccessfullSave(){
    this.modalActive.dismiss(0);
  }

  playAudio(status) {
    let audio = new Audio();
    if(status==="success")
      audio.src = "../../../assets/audio/success.mp3";
    if(status==="delete")
      audio.src = "../../../assets/audio/delete.mp3";
    if(status==="undo")
      audio.src = "../../../assets/audio/undo.mp3";

    audio.load();
    audio.play();
  }

}
