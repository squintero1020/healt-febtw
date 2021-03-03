import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionesComponent } from './acciones.component';

const routes: Routes = [
  { path: '', component: AccionesComponent },
  { path: 'formularioAcciones', loadChildren: () => import('./formulario-acciones/formulario-acciones.module').then(m => m.FormularioAccionesModule) },
  { path: 'formularioAcciones/:id', loadChildren: () => import('./formulario-acciones/formulario-acciones.module').then(m => m.FormularioAccionesModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccionesRoutingModule { }
