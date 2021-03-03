import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioProveedoresComponent } from './formulario-proveedores.component';

const routes: Routes = [{ path: '', component: FormularioProveedoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioProveedoresRoutingModule { }
