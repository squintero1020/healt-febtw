import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [ProveedoresComponent],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule
  ]
})
export class ProveedoresModule { }
