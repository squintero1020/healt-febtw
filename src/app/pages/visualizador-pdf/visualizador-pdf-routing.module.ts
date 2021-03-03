import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizadorPDFComponent } from './visualizador-pdf.component';

const routes: Routes = [{ path: '', component: VisualizadorPDFComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizadorPDFRoutingModule { }
