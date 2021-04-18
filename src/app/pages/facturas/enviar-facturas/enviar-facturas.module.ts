import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviarFacturasRoutingModule } from './enviar-facturas-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EnviarFacturasComponent } from './enviar-facturas.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnviarFacturasRoutingModule,
    SharedModule
  ]
})
export class EnviarFacturasModule { }
