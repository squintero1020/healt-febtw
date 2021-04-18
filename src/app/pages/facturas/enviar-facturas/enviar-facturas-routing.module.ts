import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EnviarFacturasComponent } from './enviar-facturas.component';


const routes: Routes = [
  {
    path:'', component: EnviarFacturasComponent, canActivate : [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnviarFacturasRoutingModule { }
