import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VerEmpresaComponent } from './ver-empresa.component';


const routes: Routes = [
  {
    path:'', component:VerEmpresaComponent, canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerEmpresaRoutingModule { }
