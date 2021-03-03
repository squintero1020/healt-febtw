import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresComponent } from './proveedores.component';

const routes: Routes = [
  { path: '', component: ProveedoresComponent },
  { path: 'formularioProveedores', loadChildren: () => import('./formulario-proveedores/formulario-proveedores.module').then(m => m.FormularioProveedoresModule) },
  { path: 'formularioProveedores/:id', loadChildren: () => import('./formulario-proveedores/formulario-proveedores.module').then(m => m.FormularioProveedoresModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
