import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerEmpresaRoutingModule } from './ver-empresa-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VerEmpresaComponent } from './ver-empresa.component';


@NgModule({
  declarations: [VerEmpresaComponent],
  imports: [
    CommonModule,
    VerEmpresaRoutingModule,
    SharedModule
  ]
})
export class VerEmpresaModule { }
