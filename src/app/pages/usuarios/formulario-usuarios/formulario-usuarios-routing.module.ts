import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioUsuariosComponent } from './formulario-usuarios.component';

const routes: Routes = [{ path: '', component: FormularioUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioUsuariosRoutingModule { }
