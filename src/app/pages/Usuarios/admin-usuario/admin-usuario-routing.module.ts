import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminUsuarioComponent } from './admin-usuario.component';


const routes: Routes = [
  {
    path:'', component: AdminUsuarioComponent, canActivate: [AuthService]
  },
  {
    path:'crearusuario',
    loadChildren:() => import('./../add-usuario/add-usuario.module').then(m=> m.AddUsuarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsuarioRoutingModule { }
