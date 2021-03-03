import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlujosService } from 'src/app/shared/services/flujos.service';
import { FacturasService } from '../../../shared/services/facturas.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Factura } from 'src/app/shared/models/factura';
import Swal from "sweetalert2";

@Component({
  selector: 'app-cambiar-flujo',
  templateUrl: './cambiar-flujo.component.html',
  styleUrls: ['./cambiar-flujo.component.scss']
})
export class CambiarFlujoComponent implements OnInit {
  public data: any;
  public id: number;
  flujoId: number;
  factura: Factura;
  flujos: any;

  constructor(
    public modalActive: NgbActiveModal,
    private apiFacturaService: FacturasService,
    private spinner: NgxSpinnerService,
    private apiFlujosService: FlujosService,
    ) { }

  ngOnInit(): void {
    this.getFlujo()
    console.log(this.data, this.id);
    this.flujoId = this.data.encabezadoFlujoId
  }

  getFlujo(){
    this.apiFlujosService.getByCompany(localStorage.getItem("clienteId")).then((res: any)=>{
      this.flujos = res.result
      console.log(this.flujos);
      
    })
  }

  closeViewModal() {
    this.modalActive.dismiss(0);
  }

  saveModal() {
    this.data.encabezadoFlujoId = Number(this.flujoId);
    console.log(this.data);
    this.handSuccessFullSave(this.data);
    this.apiFacturaService
      .Update(this.data)
      .then((res: any) => {
        console.log(res);
      })
      .catch(console.log);
  }

  handSuccessFullSave(form) {
    this.modalActive.close({ form });
  }

}
