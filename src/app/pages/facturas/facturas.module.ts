import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasTimbradasComponent } from './facturas-timbradas/facturas-timbradas.component';
import { AsociarAdjuntoComponent } from './asociar-adjunto/asociar-adjunto.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FacturasRoutingModule
  ]
})
export class FacturasModule { }
