import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddUsuarioComponent } from './add-usuario.component';


const routes: Routes = [
  {
    path:'', component: AddUsuarioComponent, canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUsuarioRoutingModule { }
