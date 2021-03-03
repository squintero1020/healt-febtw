import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfCorrClientesRoutingModule } from './conf-corr-clientes-routing.module';
import { ConfCorrClientesComponent } from './conf-corr-clientes.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [ConfCorrClientesComponent],
  imports: [
    CommonModule,
    ConfCorrClientesRoutingModule,
    SharedModule
  ]
})
export class ConfCorrClientesModule { }
