import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioGruposComponent } from './formulario-grupos.component';

const routes: Routes = [{ path: '', component: FormularioGruposComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioGruposRoutingModule { }
