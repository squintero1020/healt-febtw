import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasComponent } from './facturas.component';

const routes: Routes = [{ path: '', component: FacturasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
