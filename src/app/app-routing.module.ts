import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { VisualizadorPDFComponent } from './pages/visualizador-pdf/visualizador-pdf.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'ccdoc',
        pathMatch: 'full'
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)},
      { path: 'grupos', loadChildren: () => import('./pages/grupos/grupos.module').then(m => m.GruposModule) },
      { path: 'acciones', loadChildren: () => import('./pages/acciones/acciones.module').then(m => m.AccionesModule) },
      { path: 'flujos', loadChildren: () => import('./pages/flujos/flujos.module').then(m => m.FlujosModule) },
      { path: 'proveedores', loadChildren: () => import('./pages/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
      { path: 'confCorrClientes', loadChildren: () => import('./pages/conf-corr-clientes/conf-corr-clientes.module').then(m => m.ConfCorrClientesModule) },
      { path: 'ccdoc', loadChildren: () => import('./pages/facturas/facturas.module').then(m => m.FacturasModule) },
      { path: 'popup', loadChildren:() =>import('./shared/popup/popup.module').then(m=>m.PopupModule)}
    ],
    canActivate: [AuthGuard]
  },
  { path: 'aceptarRechazar/:info', loadChildren: () => import('./pages/aceptar-rechazar/aceptar-rechazar.module').then(m => m.AceptarRechazarModule) },
  { path:'documents/:id',  component: VisualizadorPDFComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
