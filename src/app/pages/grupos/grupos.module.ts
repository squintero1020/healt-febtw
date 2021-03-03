import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [GruposComponent],
  imports: [
    CommonModule,
    GruposRoutingModule,
    SharedModule
  ]
})
export class GruposModule { }
