import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfCorrClientesComponent } from './conf-corr-clientes.component';

const routes: Routes = [{ path: '', component: ConfCorrClientesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfCorrClientesRoutingModule { }
