import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAccionesComponent } from './formulario-acciones.component';

const routes: Routes = [{ path: '', component: FormularioAccionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioAccionesRoutingModule { }
