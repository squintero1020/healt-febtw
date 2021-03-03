import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlujosComponent } from './flujos.component';

const routes: Routes = [
  { path: '', component: FlujosComponent },
  { path: 'formularioFlujos', loadChildren: () => import('./formulario-flujos/formulario-flujos.module').then(m => m.FormularioFlujosModule) },
  { path: 'formularioFlujos/:id', loadChildren: () => import('./formulario-flujos/formulario-flujos.module').then(m => m.FormularioFlujosModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlujosRoutingModule { }
