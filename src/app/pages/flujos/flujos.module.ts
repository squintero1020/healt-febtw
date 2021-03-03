import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlujosRoutingModule } from './flujos-routing.module';
import { FlujosComponent } from './flujos.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [FlujosComponent],
  imports: [
    CommonModule,
    FlujosRoutingModule,
    SharedModule
  ]
})
export class FlujosModule { }
