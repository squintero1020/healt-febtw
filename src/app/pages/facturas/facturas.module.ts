import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [FacturasComponent],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    SharedModule,
  ]
})
export class FacturasModule { }
