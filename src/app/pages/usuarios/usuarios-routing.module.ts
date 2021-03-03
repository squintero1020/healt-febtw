import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [{ path: '', component: UsuariosComponent },
{ path: 'formularioUsuario', loadChildren: () => import('./formulario-usuarios/formulario-usuarios.module').then(m => m.FormularioUsuariosModule) },
{ path: 'formularioUsuario/:id', loadChildren: () => import('./formulario-usuarios/formulario-usuarios.module').then(m => m.FormularioUsuariosModule) },
{ path: 'formularioImportarUsuario', loadChildren: () => import('./formulario-importar-usuarios/formulario-importar-usuarios.module').then(m => m.FormularioImportarUsuariosModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
