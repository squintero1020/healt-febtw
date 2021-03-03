import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizadorPDFRoutingModule } from './visualizador-pdf-routing.module';
import { VisualizadorPDFComponent } from './visualizador-pdf.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [VisualizadorPDFComponent],
  imports: [
    CommonModule,
    VisualizadorPDFRoutingModule,
    SharedModule
  ]
})
export class VisualizadorPDFModule { }
