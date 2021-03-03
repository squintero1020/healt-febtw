import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioImportarUsuariosComponent } from './formulario-importar-usuarios.component';

const routes: Routes = [{ path: '', component: FormularioImportarUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioImportarUsuariosRoutingModule { }
