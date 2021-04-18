import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsociarAdjuntoRoutingModule } from './asociar-adjunto-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AsociarAdjuntoComponent } from './asociar-adjunto.component';


@NgModule({
  declarations: [AsociarAdjuntoComponent],
  imports: [
    CommonModule,
    AsociarAdjuntoRoutingModule,
    SharedModule
  ]
})
export class AsociarAdjuntoModule { }
