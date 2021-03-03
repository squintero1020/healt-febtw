import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioImportarUsuariosRoutingModule } from './formulario-importar-usuarios-routing.module';
import { FormularioImportarUsuariosComponent } from './formulario-importar-usuarios.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [FormularioImportarUsuariosComponent],
  imports: [
    CommonModule,
    FormularioImportarUsuariosRoutingModule,
    SharedModule
  ]
})
export class FormularioImportarUsuariosModule { }
