import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptarRechazarComponent } from './aceptar-rechazar.component';

const routes: Routes = [{ path: '', component: AceptarRechazarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceptarRechazarRoutingModule { }
