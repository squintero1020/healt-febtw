import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AceptarRechazarRoutingModule } from './aceptar-rechazar-routing.module';
import { AceptarRechazarComponent } from './aceptar-rechazar.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [AceptarRechazarComponent],
  imports: [
    CommonModule,
    AceptarRechazarRoutingModule,
    SharedModule
  ]
})
export class AceptarRechazarModule { }
