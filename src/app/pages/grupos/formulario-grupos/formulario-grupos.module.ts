import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioGruposRoutingModule } from './formulario-grupos-routing.module';
import { FormularioGruposComponent } from './formulario-grupos.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [FormularioGruposComponent],
  imports: [
    CommonModule,
    FormularioGruposRoutingModule,
    SharedModule
  ]
})
export class FormularioGruposModule { }
