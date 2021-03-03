import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { info } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FacturasService } from '../../shared/services/facturas.service';
import { FacturasFlujoService } from '../../shared/services/facturas-flujo.service';

@Component({
  selector: 'app-aceptar-rechazar',
  templateUrl: './aceptar-rechazar.component.html',
  styleUrls: ['./aceptar-rechazar.component.scss']
})
export class AceptarRechazarComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiFacturaService: FacturasService,
    private apiFacturaFlujoService: FacturasFlujoService
  ) { }

  ngOnInit(): void {
    const info = this._route.snapshot.params["info"];

    console.log(info);

    this.AceptOrRegect(info)
    
  }



  AceptOrRegect(info: string) {
    this.spinner.show();
    this.apiFacturaFlujoService
      .changeStatusByEmail(info)
      .then((res: any) => {
        console.log(res);
        
        this.spinner.hide();
        if (res.success) {
          Swal.fire(
            "Se actualizó el estado de la factura",
            `la factura se : ${res ? "Aceptó" : "Rechazó"}`,
            "success"
          );
        } else {
          Swal.fire(
            "Error",
            "Error en el cambio de estados de la factura",
            "error"
          );
        }
      })
      .catch(console.log);
  }

}
