import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposComponent } from './grupos.component';

const routes: Routes = [{ path: '', component: GruposComponent },
 { path: 'formularioGrupos', loadChildren: () => import('./formulario-grupos/formulario-grupos.module').then(m => m.FormularioGruposModule) },
 { path: 'formularioGrupos/:id', loadChildren: () => import('./formulario-grupos/formulario-grupos.module').then(m => m.FormularioGruposModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
