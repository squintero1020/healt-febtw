import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'app',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'Inicio',
        pathMatch: 'full'
      },
      {
        path:'Inicio', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m=> m.DashboardModule)
      },
      {
        path:'VerEmpresa', loadChildren:() => import('./pages/Empresas/ver-empresa/ver-empresa.module').then(m=>m.VerEmpresaModule)
      },
      {
        path:'Facturas',
        loadChildren:()=>import('./pages/Facturas/facturas.module').then(m=>m.FacturasModule)
      },
      {
        path:'Usuarios',
        loadChildren:()=>import('./pages/Usuarios/admin-usuario/admin-usuario.module').then(m=>m.AdminUsuarioModule)
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
