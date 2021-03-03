import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioProveedoresRoutingModule } from './formulario-proveedores-routing.module';
import { FormularioProveedoresComponent } from './formulario-proveedores.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [FormularioProveedoresComponent],
  imports: [
    CommonModule,
    FormularioProveedoresRoutingModule,
    SharedModule
  ]
})
export class FormularioProveedoresModule { }
