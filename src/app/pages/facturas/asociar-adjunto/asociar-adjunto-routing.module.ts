import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AsociarAdjuntoComponent } from './asociar-adjunto.component';


const routes: Routes = [
  {
    path:'', component:AsociarAdjuntoComponent, canActivate : [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsociarAdjuntoRoutingModule { }
