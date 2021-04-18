import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasTimbradasRoutingModule } from './facturas-timbradas-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FacturasTimbradasComponent } from './facturas-timbradas.component';


@NgModule({
  declarations: [FacturasTimbradasComponent],
  imports: [
    CommonModule,
    FacturasTimbradasRoutingModule,
    SharedModule
  ]
})
export class FacturasTimbradasModule { }
