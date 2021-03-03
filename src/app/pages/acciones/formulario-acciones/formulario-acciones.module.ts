import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioAccionesRoutingModule } from './formulario-acciones-routing.module';
import { FormularioAccionesComponent } from './formulario-acciones.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [FormularioAccionesComponent],
  imports: [
    CommonModule,
    FormularioAccionesRoutingModule,
    SharedModule
  ]
})
export class FormularioAccionesModule { }
