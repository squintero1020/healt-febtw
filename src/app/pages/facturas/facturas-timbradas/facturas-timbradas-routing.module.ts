import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FacturasTimbradasComponent } from './facturas-timbradas.component';


const routes: Routes = [
  {
    path:'', component: FacturasTimbradasComponent, canActivate : [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasTimbradasRoutingModule { }
