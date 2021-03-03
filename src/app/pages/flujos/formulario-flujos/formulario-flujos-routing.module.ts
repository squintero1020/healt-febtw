import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioFlujosComponent } from './formulario-flujos.component';

const routes: Routes = [{ path: '', component: FormularioFlujosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioFlujosRoutingModule { }
