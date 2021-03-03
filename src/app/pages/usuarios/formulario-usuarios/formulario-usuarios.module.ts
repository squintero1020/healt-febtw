import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioUsuariosRoutingModule } from './formulario-usuarios-routing.module';
import { FormularioUsuariosComponent } from './formulario-usuarios.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [FormularioUsuariosComponent],
  imports: [
    CommonModule,
    FormularioUsuariosRoutingModule,
    SharedModule
  ]
})
export class FormularioUsuariosModule { }
